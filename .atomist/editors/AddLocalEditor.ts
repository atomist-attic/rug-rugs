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
import { Editor, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { EditProject } from "@atomist/rug/operations/ProjectEditor";
import { Pattern } from "@atomist/rug/operations/RugOperation";

import { isRugArchive } from "./RugEditorsPredicates";
import { RugParameters } from "./RugParameters";

/**
 * Add an editor for modifying the local project.  Useful when you
 * editors are specific to a project and you want to store them with
 * the project.
 */
@Editor("AddLocalEditor", "adds an editor for modifying the local project, initiating a Rug archive if needed")
@Tags("rug", "atomist", "typescript")
export class AddLocalEditor implements EditProject {

    @Parameter({
        ...RugParameters.Name,
        name: "Editor Name",
        description: "name for the new Rug editor",
    })
    public editorName: string;

    @Parameter({
        ...RugParameters.Description,
        name: "Description",
        description: "description of the new Rug editor",
        required: false,
    })
    public description: string = "an editor for modifying this project";

    @Parameter(RugParameters.GroupId)
    public groupId: string = "local";

    public edit(project: Project) {
        if (!isRugArchive(project)) {
            project.editWith("ConvertExistingProjectToRugArchive", {
                description: this.description,
                archiveName: project.name,
                groupId: this.groupId,
            });
        }
        project.editWith("AddTypeScriptEditor", this);
    }
}

export const addLocalEditor = new AddLocalEditor();
