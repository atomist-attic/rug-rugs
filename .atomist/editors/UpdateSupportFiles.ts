/*
 * Copyright © 2017 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Project } from "@atomist/rug/model/Project";
import { Editor, Tags } from "@atomist/rug/operations/Decorators";
import { EditProject } from "@atomist/rug/operations/ProjectEditor";
import { Pattern } from "@atomist/rug/operations/RugOperation";

import { IsRugArchive } from "./RugEditorsPredicates";

@Editor("UpdateSupportFiles", "updates Rug project TypeScript and build files")
@Tags("rug", "atomist", "typescript")
export class UpdateSupportFiles implements EditProject {

    public edit(project: Project) {
        if (!IsRugArchive(project)) {
            console.log("This project does not appear to be a Rug archive project");
            return;
        }

        const oldFiles = [
            ".atomist/build/cli-build.yml",
            ".atomist/build/cli-dev.yml",
            ".atomist/build/cli-release.yml",
        ];
        for (const f of oldFiles) {
            project.deleteFile(f);
        }

        const supportFiles = [
            ".atomist/package.json",
            ".atomist/tsconfig.json",
            ".atomist/tslint.json",
            ".atomist/.gitignore",
            ".atomist/build/cli.yml",
            ".atomist/build/travis-build.bash",
        ];
        for (const f of supportFiles) {
            project.deleteFile(f);
            project.copyEditorBackingFileOrFail(f);
        }

        const travisYml = project.findFile(".travis.yml");
        if (travisYml != null) {
            travisYml.regexpReplace("install:\\s*?-?\\s*?nvm install 6.9.2\\s*?\n",
                "install: nvm install 6.9.2 && npm install -g yarn && yarn global add tslint typescript\n");
        }
    }
}

export const updateSupportFiles = new UpdateSupportFiles();
