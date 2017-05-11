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

import { File } from "@atomist/rug/model/File";
import { Project } from "@atomist/rug/model/Project";
import { Editor, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { EditProject } from "@atomist/rug/operations/ProjectEditor";
import { Pattern } from "@atomist/rug/operations/RugOperation";

import { isRugArchive } from "./RugEditorsPredicates";
import { RugParameters } from "./RugParameters";

@Editor("AddManifestYml", "adds a Rug archive manifest")
@Tags("rug", "atomist")
export class AddManifestYml implements EditProject {

    @Parameter({
        displayName: "Rug Archive Name",
        description: "name of your new Rug Archive, typically the same as the repo name",
        pattern: Pattern.project_name,
        validInput: "a valid GitHub repo name containing only alphanumeric, ., -, and _ characters",
        minLength: 1,
        maxLength: 100,
    })
    public archiveName: string;

    @Parameter(RugParameters.GroupId)
    public groupId: string;

    @Parameter({
        displayName: "Rug Archive Version",
        description: "initial version of the project, e.g., 1.2.3",
        pattern: Pattern.semantic_version,
        validInput: "a valid semantic version, http://semver.org",
        minLength: 1,
        maxLength: 100,
        required: false,
    })
    public version: string = "0.1.0";

    public edit(project: Project) {
        if (isRugArchive(project)) {
            console.log("project already appears to be a Rug archive project");
            return;
        }

        const manifestPath = ".atomist/manifest.yml";
        project.copyEditorBackingFileOrFail(manifestPath);

        const manifest: File = project.findFile(".atomist/manifest.yml");
        const lines: string[] = manifest.content.split("\n");
        const newLines: string[] = [
            `group: "${this.groupId}"`,
            `artifact: "${this.archiveName}"`,
            `version: "${this.version}"`,
        ];
        for (const l of lines) {
            if (/^requires:/.test(l)) {
                newLines.push(l);
            }
        }
        manifest.setContent(newLines.join("\n"));
        project.copyEditorBackingFileOrFail(".atomist/.gitignore");
    }
}

export const addManifestYml = new AddManifestYml();
