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
import { Project } from '@atomist/rug/model/Project'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'
import { File } from '@atomist/rug/model/File'

import { IsRugArchive, IsSetUpForTypeScript } from './RugEditorsPredicates'

@Editor("AddTypeScriptExecutor", "add TypeScript Rug executor to project")
@Tags("rug", "atomist")
export class AddTypeScriptExecutor implements EditProject {

    @Parameter({
        displayName: "Executor Name",
        description: "name of Rug executor to add",
        pattern: "^[A-Z][A-Za-z0-9]*$",
        validInput: "a valid Rug Executor name starting with a capital letter and containing only alphanumberic characters from one to 100 characters long",
        minLength: 1,
        maxLength: 100
    })
    executor_name: string;

    @Parameter({
        displayName: "Executor Description",
        description: "short descriptive text describing the new executor",
        pattern: Pattern.any,
        validInput: "free text",
        minLength: 1,
        maxLength: 100
    })
    description: string;

    @Parameter({
        displayName: "Bot Intent",
        description: "the phrase that the bot will recognize as the command to run this executor",
        pattern: Pattern.any,
        validInput: "free text",
        minLength: 1,
        maxLength: 100
    })
    bot_intent: string;

    edit(project: Project) {
        if (!IsRugArchive(project)) {
            console.log("This project does not appear to be a Rug archive project");
            return;
        }

        project.editWith("AddTypeScript", {});

        let executorPath = ".atomist/executors/" + this.executor_name + ".ts";
        let defaultExecutorName = "TypeScriptExecutor";
        let defaultExecutorPath = ".atomist/executors/" + defaultExecutorName + ".ts";
        let defaultExecutorVarName = "typeScriptExecutor";
        let executorVarName = this.executor_name.charAt(0).toLowerCase() + this.executor_name.slice(1);
        let defaultBotIntent = 'tags: ["atomist/intent=do something"]';
        let fullBotIntent = 'tags: ["atomist/intent=' + this.bot_intent + '"]';
        let defaultDescription = 'description: "Sample TypeScript Executor"';
        let fullDescription = 'description: "' + this.description + '"';

        project.copyEditorBackingFileOrFail(defaultExecutorPath, executorPath);

        let eng: PathExpressionEngine = project.context().pathExpressionEngine();

        let executorPE = new PathExpression<Project, File>("/*[@name='.atomist']/executors/*[@name='" + this.executor_name + ".ts']");
        let executor: File = eng.scalar(project, executorPE);
        executor.replace(defaultExecutorName, this.executor_name);
        executor.replace(defaultExecutorVarName, executorVarName);
        executor.replace(defaultBotIntent, fullBotIntent);
        executor.replace(defaultDescription, fullDescription);
    }
}

export const addTypeScriptExecutor = new AddTypeScriptExecutor()
