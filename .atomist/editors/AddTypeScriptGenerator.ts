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
import { Project, File } from '@atomist/rug/model/Core'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { PathExpressionEngine } from '@atomist/rug/tree/PathExpression'

import { addInstructionsToReadMe, readMeInstructions } from './AddFunctions';
import { IsRugArchive } from './RugEditorsPredicates';

@Editor("AddTypeScriptGenerator", "adds a TypeScript generator to a Rug archive project")
@Tags("rug", "atomist", "typescript")
class AddTypeScriptGenerator implements EditProject {

    @Parameter({
        displayName: "Generator Name",
        description: "name of generator to add to Rug archive project",
        pattern: "^[A-Z][A-Za-z0-9]*$",
        validInput: "a valid generator name starting with a capital letter and consisting of alphanumeric characters from one to 100 characters long",
        minLength: 1,
        maxLength: 100
    })
    generator_name: string;

    @Parameter({
        displayName: "Generator Description",
        description: "description of generator to add to Rug archive project",
        pattern: Pattern.any,
        validInput: "a string between one and 100 characters",
        minLength: 1,
        maxLength: 100
    })
    description: string

    edit(project: Project) {
        if (!IsRugArchive(project)) {
            console.log("This project does not appear to be a Rug archive project");
            return;
        }

        project.editWith("AddTypeScript", {});

        let srcGeneratorPath = ".atomist/editors/TypeScriptGenerator.ts";
        let srcTestPath = ".atomist/tests/TypeScriptGenerator.rt";

        let generatorPath = srcGeneratorPath.replace("TypeScriptGenerator", this.generator_name);
        let testPath = srcTestPath.replace("TypeScriptGenerator", this.generator_name);

        project.copyEditorBackingFileOrFail(srcGeneratorPath, generatorPath);
        project.copyEditorBackingFileOrFail(srcTestPath, testPath);

        let lcFirstGeneratorName = this.generator_name[0].toLowerCase() + this.generator_name.slice(1);

        let eng: PathExpressionEngine = project.context().pathExpressionEngine();

        let generatorPathExpression = "/*[@name='.atomist']/editors/*[@name='" + this.generator_name + ".ts']";
        eng.with<File>(project, generatorPathExpression, g => {
            g.replace("sample TypeScript generator used by AddTypeScriptGenerator", this.description);
            g.replace("TypeScriptGenerator", this.generator_name);
            g.replace("typeScriptGenerator", lcFirstGeneratorName);
        });

        let testPathExpression = "/*[@name='.atomist']/tests/*[@name='" + this.generator_name + ".rt']";
        eng.with<File>(project, testPathExpression, t => {
            t.replace("TypeScriptGenerator", this.generator_name);
        });

        const example = `\$ cd parent/directory
\$ rug generate atomist-rugs:rug-editors:${this.generator_name} \\\\
    my-new-project`;
        const example_text = "Explain what your generator does here.";
        const prerequisites = "Put your editor prerequisites here.";
        let parameters: string[] = ["`project_name` | Yes | | Name of project to be created"];
        const instructions = readMeInstructions(
            this.generator_name,
            this.description,
            example,
            example_text,
            "",
            parameters
        );
        addInstructionsToReadMe(project, instructions);
    }
}

export const addTypeScriptGenerator = new AddTypeScriptGenerator()
