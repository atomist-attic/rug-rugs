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

import { IsRugArchive, IsSetUpForTypeScript } from "./RugEditorsPredicates";

@Editor("AddTypeScript", "adds TypeScript supporting files to a Rug archive project")
@Tags("rug", "atomist", "typescript")
export class AddTypeScript implements EditProject {

    public edit(project: Project) {
        if (!IsRugArchive(project)) {
            const err = "project does not appear to be a Rug project";
            console.log(err);
            throw new Error(err);
        }

        if (IsSetUpForTypeScript(project)) {
            return;
        }

        project.copyEditorBackingFileOrFail(".atomist/package.json");
        project.copyEditorBackingFileOrFail(".atomist/tsconfig.json");
        project.copyEditorBackingFileOrFail(".atomist/tslint.json");
        console.log("TypeScript files added, run `cd .atomist && npm install -g yarn && yarn`");
    }
}

export const addTypeScript = new AddTypeScript();
