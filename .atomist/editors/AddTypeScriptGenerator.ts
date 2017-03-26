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

import { addInstructionsToReadMe, readMeInstructions } from './AddFunctions';
import { IsRugArchive } from './RugEditorsPredicates';
import { RugParameters } from './RugParameters';

@Editor("AddTypeScriptGenerator", "adds a TypeScript generator to a Rug project")
@Tags("rug", "atomist", "typescript")
export class AddTypeScriptGenerator implements EditProject {

    @Parameter({
        ...RugParameters.Name,
        displayName: "Generator Name",
        description: "name of generator to add to Rug archive project"
    })
    generatorName: string;

    @Parameter({
        ...RugParameters.Description,
        displayName: "Generator Description",
        description: "description of generator to add to Rug archive project"
    })
    description: string;

    edit(project: Project) {
        if (!IsRugArchive(project)) {
            console.log("This project does not appear to be a Rug archive project");
            return;
        }

        project.editWith("AddTypeScript", {});

        const srcGeneratorName = "TypeScriptGenerator";
        const srcGeneratorPath = `.atomist/generators/${srcGeneratorName}.ts`;
        const srcTestPath = ".atomist/tests/project/TypeScriptGeneratorSteps.ts";
        const srcFeaturePath = ".atomist/tests/project/TypeScriptGeneratorTest.feature";
        const generatorPath = srcGeneratorPath.replace(srcGeneratorName, this.generatorName);
        const testPath = srcTestPath.replace(srcGeneratorName, this.generatorName);
        const featurePath = srcFeaturePath.replace(srcGeneratorName, this.generatorName);

        project.copyEditorBackingFileOrFailToDestination(srcGeneratorPath, generatorPath);
        project.copyEditorBackingFileOrFailToDestination(srcTestPath, testPath);
        project.copyEditorBackingFileOrFailToDestination(srcFeaturePath, featurePath);

        const srcDescription = "sample TypeScript generator used by AddTypeScriptGenerator";
        const srcGeneratorConstName = "typeScriptGenerator";
        const generatorConstName = this.generatorName[0].toLowerCase() + this.generatorName.slice(1);

        let generatorFile: File = project.findFile(generatorPath);
        generatorFile.replace(srcDescription, this.description);
        generatorFile.replace(srcGeneratorName, this.generatorName);
        generatorFile.replace(srcGeneratorConstName, generatorConstName);

        let testFile: File = project.findFile(testPath);
        testFile.replace(srcGeneratorName, this.generatorName);

        let featureFile: File = project.findFile(featurePath);
        featureFile.replace(srcDescription, this.description);
        featureFile.replace(srcGeneratorName, this.generatorName);

        const example = `\$ cd parent/directory
\$ rug generate atomist-rugs:rug-editors:${this.generatorName} \\\\
    my-new-project`;
        const exampleText = "Explain what your generator does here.";
        const prerequisites = "Put your editor prerequisites here.";
        let parameters: string[] = ["`projectName` | Yes | | Name of project to be created"];
        const instructions = readMeInstructions(
            this.generatorName,
            this.description,
            example,
            exampleText,
            "",
            parameters
        );
        addInstructionsToReadMe(project, instructions);
    }
}

export const addTypeScriptGenerator = new AddTypeScriptGenerator();
