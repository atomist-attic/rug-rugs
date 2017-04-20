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
import { File } from '@atomist/rug/model/File';

import { IsRugArchive, IsSetUpForTypeScript } from './RugEditorsPredicates';
import { addInstructionsToReadMe, readMeInstructions } from './AddFunctions';
import { RugParameters } from './RugParameters';

@Editor("AddTypeScriptEditor", "adds a TypeScript Rug editor to a Rug project")
@Tags("rug", "atomist", "typescript")
export class AddTypeScriptEditor implements EditProject {

    @Parameter({
        ...RugParameters.Name,
        displayName: "Editor Name",
        description: "name of new editor to add to Rug project"
    })
    editorName: string;

    @Parameter({
        ...RugParameters.Description,
        displayName: "Editor Description",
        description: "short description of editor to add to Rug project"
    })
    description: string;

    edit(project: Project) {

        if (!IsRugArchive(project)) {
            console.log("This project does not appear to be a Rug project");
            return;
        }

        project.editWith("AddTypeScript", {});

        const srcEditorName = "TypeScriptEditor";
        const srcEditorPath = `.atomist/editors/${srcEditorName}.ts`;
        const srcTestPath = `.atomist/tests/project/${srcEditorName}Steps.ts`;
        const srcFeaturePath = `.atomist/tests/project/${srcEditorName}Test.feature`;
        const editorPath = srcEditorPath.replace(srcEditorName, this.editorName);
        const testPath = srcTestPath.replace(srcEditorName, this.editorName);
        const featurePath = srcFeaturePath.replace(srcEditorName, this.editorName);

        project.copyEditorBackingFileOrFailToDestination(srcEditorPath, editorPath);
        project.copyEditorBackingFileOrFailToDestination(srcTestPath, testPath);
        project.copyEditorBackingFileOrFailToDestination(srcFeaturePath, featurePath);

        const srcDescription = "sample TypeScript editor used by AddTypeScriptEditor";
        const srcEditorConstName = "typeScriptEditor";
        const editorConstName = this.editorName.charAt(0).toLowerCase() + this.editorName.slice(1);

        let editorFile: File = project.findFile(editorPath);
        editorFile.replace(srcDescription, this.description);
        editorFile.replace(srcEditorName, this.editorName);
        editorFile.replace(srcEditorConstName, editorConstName);

        let testFile: File = project.findFile(testPath);
        testFile.replace(srcEditorName, this.editorName);

        let featureFile: File = project.findFile(featurePath);
        featureFile.replace(srcDescription, this.description);
        featureFile.replace(srcEditorName, this.editorName);

        const example = `\$ rug edit -C ../project/directory -l ${this.editorName} inputParameter='some value'`;
        const exampleText = "Explain what your editor does here.";
        const prerequisites = "Put your editor prerequisites here.";
        let parameters: string[] = ["`inputParameter` | Yes | | Example input parameter"];
        const instructions = readMeInstructions(
            this.editorName,
            this.description,
            example,
            exampleText,
            prerequisites,
            parameters
        );
        addInstructionsToReadMe(project, instructions);
    }
}

export const addTypeScriptEditor = new AddTypeScriptEditor();
