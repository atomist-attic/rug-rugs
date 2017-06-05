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

import { addInstructionsToReadMe, readMeInstructions } from "./AddFunctions";
import { isRugArchive, NotRugArchiveError } from "./RugEditorsPredicates";
import { RugParameters } from "./RugParameters";

/**
 * Add a generator to a Rug project.  If the project is not a Rug project
 * an Error is thrown.
 */
@Editor("AddTypeScriptGenerator", "adds a TypeScript generator to a Rug project")
@Tags("rug", "atomist", "typescript")
export class AddTypeScriptGenerator implements EditProject {

    @Parameter({
        ...RugParameters.Name,
        displayName: "Generator Name",
        description: "name of generator to add to Rug archive project",
    })
    public generatorName: string;

    @Parameter({
        ...RugParameters.Description,
        displayName: "Generator Description",
        description: "description of generator to add to Rug archive project",
    })
    public description: string;

    public edit(project: Project) {
        if (!isRugArchive(project)) {
            throw new NotRugArchiveError();
        }

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

        const generatorFile: File = project.findFile(generatorPath);
        generatorFile.replace(srcDescription, this.description);
        generatorFile.replace(srcGeneratorName, this.generatorName);
        generatorFile.replace(srcGeneratorConstName, generatorConstName);

        const testFile: File = project.findFile(testPath);
        testFile.replace(srcGeneratorName, this.generatorName);

        const featureFile: File = project.findFile(featurePath);
        featureFile.replace(srcDescription, this.description);
        featureFile.replace(srcGeneratorName, this.generatorName);

        const example = `\$ rug generate -C ../parent/directory -l ${this.generatorName} my-new-project`;
        const exampleText = "Explain what your generator does here.";
        const parameters: string[] = ["`projectName` | Yes | | Name of project to be created"];
        const instructions = readMeInstructions(
            this.generatorName,
            this.description,
            example,
            exampleText,
            "",
            parameters,
        );
        addInstructionsToReadMe(project, instructions);
    }
}

export const addTypeScriptGenerator = new AddTypeScriptGenerator();
