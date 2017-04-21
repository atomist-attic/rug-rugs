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

@Editor("AddTypeScriptEventHandler", "adds a TypeScript Rug event handler to a Rug project")
@Tags("rug", "atomist", "typescript")
export class AddTypeScriptEventHandler implements EditProject {

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
        displayName: "Path Expression",
        description: "path expression to the event that will trigger this handler",
        pattern: "^/[\\s\\S]*$",
        validInput: "a valid path expression",
        minLength: 1,
        maxLength: 500,
        required: false,
    })
    public pathExpression: string = "/Tag()";

    public edit(project: Project) {
        if (!IsRugArchive(project)) {
            console.log("This project does not appear to be a Rug archive project");
            return;
        }

        project.editWith("AddTypeScript", {});

        const srcHandlerName = "TypeScriptEventHandler";
        const srcHandlerPath = `.atomist/handlers/event/${srcHandlerName}.ts`;
        const srcTestPath = `.atomist/tests/handlers/event/${srcHandlerName}Steps.ts`;
        const srcFeaturePath = `.atomist/tests/handlers/event/${srcHandlerName}Test.feature`;
        const handlerPath = srcHandlerPath.replace(srcHandlerName, this.handlerName);
        const testPath = srcTestPath.replace(srcHandlerName, this.handlerName);
        const featurePath = srcFeaturePath.replace(srcHandlerName, this.handlerName);

        project.copyEditorBackingFileOrFailToDestination(srcHandlerPath, handlerPath);
        project.copyEditorBackingFileOrFailToDestination(srcTestPath, testPath);
        project.copyEditorBackingFileOrFailToDestination(srcFeaturePath, featurePath);

        const srcDescription = "sample TypeScript event handler used by AddTypeScriptEventHandler";
        const srcPathExpression = "/Tag()";
        const srcHandlerConstName = "typeScriptEventHandler";
        const handlerConstName = this.handlerName.charAt(0).toLowerCase() + this.handlerName.slice(1);

        const handler: File = project.findFile(handlerPath);
        handler.replace(srcDescription, this.description);
        handler.replace(srcHandlerName, this.handlerName);
        handler.replace(srcHandlerConstName, handlerConstName);
        handler.replace(srcPathExpression, this.pathExpression);

        const testFile: File = project.findFile(testPath);
        testFile.replace(srcHandlerName, this.handlerName);

        const featureFile: File = project.findFile(featurePath);
        featureFile.replace(srcHandlerName, this.handlerName);

        const rootMatches = /^\/(\w+)\(\)/.exec(this.pathExpression);
        if (rootMatches == null || rootMatches.length < 2) {
            console.log(`failed to match type of root node in path expression: ${this.pathExpression}`);
        } else {
            const newRoot = rootMatches[1];
            const handlerContents = handler.content;
            const newHandlerContents = handlerContents.replace(/\bTag\b/g, newRoot);
            handler.setContent(newHandlerContents);
            testFile.replace("Tag", newRoot);
            featureFile.replace("Tag", newRoot);
        }
    }
}

export const addTypeScriptEventHandler = new AddTypeScriptEventHandler();
