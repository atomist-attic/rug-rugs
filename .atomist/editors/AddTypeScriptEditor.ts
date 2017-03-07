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
import { Project } from '@atomist/rug/model/Core';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression';
import { File } from '@atomist/rug/model/File';

import { IsRugArchive, IsSetUpForTypeScript } from './RugEditorsPredicates';
import { addInstructionsToReadMe, readMeInstructions } from './AddFunctions';

@Editor("AddTypeScriptEditor", "add TypeScript Rug editor to project")
@Tags("rug", "atomist", "typescript")
class AddTypeScriptEditor implements EditProject {

    @Parameter({
        displayName: "Editor Name",
        description: "name of new editor to add to Rug archive project",
        pattern: "^[A-Z][A-Za-z0-9]*$",
        validInput: "a valid Rug Editor name starting with a capital letter and containing only alphanumeric characters from one to 100 characters long",
        minLength: 1,
        maxLength: 100
    })
    editor_name: string;

    @Parameter({
        displayName: "Editor Description",
        description: "short description of editor to add to Rug archive project",
        pattern: Pattern.any,
        validInput: "free text",
        minLength: 1,
        maxLength: 100
    })
    description: string;

    edit(project: Project) {

        if (!IsRugArchive(project)) {
            console.log("This project does not appear to be a Rug archive project, see https://github.com/atomist-rugs/rug-archive#addbasicrugarchivemanifestyml");
            return;
        }

        project.editWith("AddTypeScript", {});

        const editorPath = ".atomist/editors/" + this.editor_name + ".ts";
        const testPath = ".atomist/tests/" + this.editor_name + ".rt";
        const defaultEditorName = "TypeScriptEditor";
        const defaultEditorPath = ".atomist/editors/" + defaultEditorName + ".ts";
        const defaultTestPath = ".atomist/tests/" + defaultEditorName + ".rt";

        project.copyEditorBackingFileOrFail(defaultEditorPath, editorPath);
        project.copyEditorBackingFileOrFail(defaultTestPath, testPath);

        const eng: PathExpressionEngine = project.context().pathExpressionEngine();

        const editorPE = "/*[@name='.atomist']/editors/*[@name='" + this.editor_name + ".ts']";
        eng.with<File>(project, editorPE, e => {
            e.replace(defaultEditorName, this.editor_name);
            e.replace("sample TypeScript editor used by AddTypeScriptEditor", this.description);
            const defaultEditorConstName = "typeScriptEditor";
            const editorConstName = this.editor_name.charAt(0).toLowerCase() + this.editor_name.slice(1);
            e.replace(defaultEditorConstName, editorConstName);
        });

        const testPE = "/*[@name='.atomist']/tests/*[@name='" + this.editor_name + ".rt']";
        eng.with<File>(project, testPE, t => {
            t.replace(defaultEditorName, this.editor_name);
        });

        const example = `\$ cd project/directory
\$ rug edit atomist-rugs:rug-editors:${this.editor_name} \\\\
    input_parameter='some value'`;
        const example_text = "Explain what your editor does here.";
        const prerequisites = "Put your editor prerequisites here.";
        let parameters: string[] = ["`input_parameter` | Yes | | Example input parameter"];
        const instructions = readMeInstructions(
            this.editor_name,
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
