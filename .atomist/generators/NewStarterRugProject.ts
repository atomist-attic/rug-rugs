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
import { Generator, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { PopulateProject } from "@atomist/rug/operations/ProjectGenerator";
import { Pattern } from "@atomist/rug/operations/RugOperation";

import { cleanChangeLog, generateRugProject } from "./RugGeneratorFunctions";

@Generator("NewStarterRugProject",
    "creates a new Rug archive project using standard setup, sensible defaults, and starter Rugs")
@Tags("atomist", "rug", "starter")
export class NewStarterRugProject implements PopulateProject {

    public populate(project: Project) {

        const description: string = "an Atomist Rug archive project";
        const owner: string = "atomist-contrib";
        const version: string = "0.1.0";
        generateRugProject(project, owner, description, version, []);

        cleanChangeLog(project, owner);

        const editorParams = {
            editorName: "MyFirstEditor",
            description: "a sample Rug TypeScript editor",
        };
        project.editWith("AddTypeScriptEditor", editorParams);

        const commandParams = {
            handlerName: "MyFirstCommandHandler",
            description: "a sample Rug TypeScript command handler",
            intent: "run MyFirstCommandHandler",
        };
        project.editWith("AddTypeScriptCommandHandler", commandParams);

        const eventParams = {
            handlerName: "MyFirstEventHandler",
            description: "a sample Rug TypeScript event handler",
        };
        project.editWith("AddTypeScriptEventHandler", eventParams);
    }
}

export const newStarterRugProject = new NewStarterRugProject();
