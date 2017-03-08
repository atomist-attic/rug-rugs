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

import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Core'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'
import { File } from '@atomist/rug/model/File'

import { IsRugArchive } from './RugEditorsPredicates'

@Editor("AddTypeScriptHandler", "add TypeScript Rug handler to project")
@Tags("rug", "atomist")
export class AddTypeScriptHandler implements EditProject {

    @Parameter({
        displayName: "Handler Name",
        description: "name of Rug handler to add",
        pattern: "^[A-Z][A-Za-z0-9]*$",
        validInput: "a valid Rug Handler name starting with a capital letter and containing only alphanumberic characters from one to 100 characters long",
        minLength: 1,
        maxLength: 100
    })
    handler_name: string;

    @Parameter({
        displayName: "Handler Description",
        description: "short descriptive text describing the new handler",
        pattern: Pattern.any,
        validInput: "free text",
        minLength: 1,
        maxLength: 100
    })
    description: string;

    @Parameter({
        displayName: "Path Expression",
        description: "path expression to the event in Atomist that will trigger this handler",
        pattern: "^/[\\s\\S]*$",
        validInput: "a valid path expression",
        minLength: 1,
        maxLength: 200
    })
    path_expression: string = "/Tag()";

    edit(project: Project) {
        if (!IsRugArchive(project)) {
            console.log("This project does not appear to be a Rug archive project");
            return;
        }

        project.editWith("AddTypeScript", {});

        let handlerPath = ".atomist/handlers/" + this.handler_name + ".ts";
        let defaultHandlerName = "TypeScriptHandler";
        let defaultHandlerPath = ".atomist/handlers/" + defaultHandlerName + ".ts";
        let defaultPathExpression = "/Tag()";
        project.copyEditorBackingFileOrFail(defaultHandlerPath, handlerPath);

        let eng: PathExpressionEngine = project.context().pathExpressionEngine();

        let handlerPE = new PathExpression<Project, File>("/*[@name='.atomist']/handlers/*[@name='" + this.handler_name + ".ts']");
        let handler: File = eng.scalar(project, handlerPE);
        handler.replace(defaultPathExpression, this.path_expression);
    }
}

export const addTypeScriptHandler = new AddTypeScriptHandler()
