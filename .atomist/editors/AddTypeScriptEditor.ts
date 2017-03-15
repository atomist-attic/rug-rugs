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

import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Project } from '@atomist/rug/model/Project';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression';
import { File } from '@atomist/rug/model/File';

import { IsRugArchive, IsSetUpForTypeScript } from './RugEditorsPredicates';
import { addInstructionsToReadMe, readMeInstructions } from './AddFunctions';
import { RugParameters } from './RugParameters';

@Editor("AddTypeScriptEditor", "add TypeScript Rug editor to project")
@Tags("rug", "atomist", "typescript")
export class AddTypeScriptEditor implements EditProject {

    @Parameter({
        ...RugParameters.Name,
        displayName: "Editor Name",
        description: "name of new editor to add to Rug archive project"
    })
    editorName: string;

    @Parameter({
        ...RugParameters.Description,
        displayName: "Editor Description",
        description: "short description of editor to add to Rug archive project"
    })
    description: string;

    edit(project: Project) {

        if (!IsRugArchive(project)) {
            console.log("This project does not appear to be a Rug archive project");
            return;
        }

        project.editWith("AddTypeScript", {});

        const editorPath = ".atomist/editors/" + this.editorName + ".ts";
        const testPath = ".atomist/tests/" + this.editorName + ".rt";
        const defaultEditorName = "TypeScriptEditor";
        const defaultEditorPath = ".atomist/editors/" + defaultEditorName + ".ts";
        const defaultTestPath = ".atomist/tests/" + defaultEditorName + ".rt";

        project.copyEditorBackingFileOrFailToDestination(defaultEditorPath, editorPath);
        project.copyEditorBackingFileOrFailToDestination(defaultTestPath, testPath);

        const eng: PathExpressionEngine = project.context().pathExpressionEngine();

        const editorPE = "/*[@name='.atomist']/editors/*[@name='" + this.editorName + ".ts']";
        eng.with<File>(project, editorPE, e => {
            e.replace("sample TypeScript editor used by AddTypeScriptEditor", this.description);
            e.replace(defaultEditorName, this.editorName);
            const defaultEditorConstName = "typeScriptEditor";
            const editorConstName = this.editorName.charAt(0).toLowerCase() + this.editorName.slice(1);
            e.replace(defaultEditorConstName, editorConstName);
        });

        const testPE = "/*[@name='.atomist']/tests/*[@name='" + this.editorName + ".rt']";
        eng.with<File>(project, testPE, t => {
            t.replace(defaultEditorName, this.editorName);
        });

        const example = `\$ cd project/directory
\$ rug edit atomist-rugs:rug-editors:${this.editorName} \\\\
    input_parameter='some value'`;
        const example_text = "Explain what your editor does here.";
        const prerequisites = "Put your editor prerequisites here.";
        let parameters: string[] = ["`input_parameter` | Yes | | Example input parameter"];
        const instructions = readMeInstructions(
            this.editorName,
            this.description,
            example,
            example_text,
            prerequisites,
            parameters
        );
        addInstructionsToReadMe(project, instructions);
    }
}

export const addTypeScriptEditor = new AddTypeScriptEditor()
