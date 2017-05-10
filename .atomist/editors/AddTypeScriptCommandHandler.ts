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

import { IsRugArchive } from "./RugEditorsPredicates";
import { RugParameters } from "./RugParameters";

@Editor("AddTypeScriptCommandHandler", "adds a TypeScript Rug event handler to a Rug project")
@Tags("rug", "atomist", "typescript")
export class AddTypeScriptCommandHandler implements EditProject {

    @Parameter({
        ...RugParameters.Name,
        displayName: "Event Handler Name",
        description: "name of new event handler to add to Rug project",
    })
    public handlerName: string;

    @Parameter({
        ...RugParameters.Description,
        displayName: "Handler Description",
        description: "short description of event handler to add to Rug project",
    })
    public description: string;

    @Parameter({
        displayName: "Bot Intent",
        description: "Message the bot will associate with this command",
        pattern: "^[A-Za-z][-\\w ]*$",
        validInput: "a phrase starting with a letter and containing only word characters and spaces",
        minLength: 1,
        maxLength: 200,
    })
    public intent: string;

    public edit(project: Project) {
        if (!IsRugArchive(project)) {
            const err = "project does not appear to be a Rug project";
            console.log(err);
            throw new Error(err);
        }

        project.editWith("AddTypeScript", {});

        const srcHandlerName = "TypeScriptCommandHandler";
        const srcHandlerPath = `.atomist/handlers/command/${srcHandlerName}.ts`;
        const srcTestPath = `.atomist/tests/handlers/command/${srcHandlerName}Steps.ts`;
        const srcFeaturePath = `.atomist/tests/handlers/command/${srcHandlerName}Test.feature`;
        const handlerPath = srcHandlerPath.replace(srcHandlerName, this.handlerName);
        const testPath = srcTestPath.replace(srcHandlerName, this.handlerName);
        const featurePath = srcFeaturePath.replace(srcHandlerName, this.handlerName);

        project.copyEditorBackingFileOrFailToDestination(srcHandlerPath, handlerPath);
        project.copyEditorBackingFileOrFailToDestination(srcTestPath, testPath);
        project.copyEditorBackingFileOrFailToDestination(srcFeaturePath, featurePath);

        const srcDescription = "sample TypeScript command handler used by AddTypeScriptCommandHandler";
        const srcIntent = `run ${srcHandlerName}`;
        const srcHandlerConstName = "typeScriptCommandHandler";
        const handlerConstName = this.handlerName.charAt(0).toLowerCase() + this.handlerName.slice(1);

        const handler: File = project.findFile(handlerPath);
        handler.replace(srcDescription, this.description);
        handler.replace(srcIntent, this.intent);
        handler.replace(srcHandlerName, this.handlerName);
        handler.replace(srcHandlerConstName, handlerConstName);

        const testFile: File = project.findFile(testPath);
        testFile.replace(srcHandlerName, this.handlerName);

        const featureFile: File = project.findFile(featurePath);
        featureFile.replace(srcHandlerName, this.handlerName);
    }
}

export const addTypeScriptCommandHandler = new AddTypeScriptCommandHandler();
