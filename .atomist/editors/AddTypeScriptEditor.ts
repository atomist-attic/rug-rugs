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

import { IsRugArchive, IsSetUpForTypeScript } from './RugEditorsPredicates'

@Editor("AddTypeScriptEditor", "add TypeScript Rug editor to project")
@Tags("documentation")
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
        if (!IsRugArchive(project) || !IsSetUpForTypeScript(project)) {
            return;
        }

        let editorPath = ".atomist/editors/" + this.editor_name + ".ts";
        let testPath = ".atomist/tests/" + this.editor_name + ".rt";
        let defaultEditorName = "TypeScriptEditor";
        let defaultEditorPath = ".atomist/editors/" + defaultEditorName + ".ts";
        let defaultTestPath = ".atomist/tests/" + defaultEditorName + ".rt";

        project.copyEditorBackingFileOrFail(defaultEditorPath, editorPath);
        project.copyEditorBackingFileOrFail(defaultTestPath, testPath);

        let eng: PathExpressionEngine = project.context().pathExpressionEngine();

        let editorPE = new PathExpression<Project, File>("/*[@name='.atomist']/editors/*[@name='" + this.editor_name + ".ts']");
        let editor: File = eng.scalar(project, editorPE);
        editor.replace(defaultEditorName, this.editor_name);
        editor.replace("@DESCRIPTION@", this.description);
        let defaultEditorConstName = "typeScriptEditor";
        let editorConstName = this.editor_name.charAt(0).toLowerCase() + this.editor_name.slice(1);
        editor.replace(defaultEditorConstName, editorConstName);

        let testPE = new PathExpression<Project, File>("/*[@name='.atomist']/tests/*[@name='" + this.editor_name + ".rt']");
        let test: File = eng.scalar(project, testPE);
        test.replace(defaultEditorName, this.editor_name);
    }
}

export const addTypeScriptEditor = new AddTypeScriptEditor()
