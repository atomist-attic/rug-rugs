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
import { PathExpression, PathExpressionEngine, TreeNode, Match } from '@atomist/rug/tree/PathExpression'

@Editor("AddTypeScriptGenerator", "adds a TypeScript generator to a Rug archive project")
@Tags("rug", "typescript")
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
        if (!project.fileExists(".atomist/manifest.yml")) {
            console.log("This project does not appear to be a Rug archive project, see https://github.com/atomist-rugs/rug-archive#addbasicrugarchivemanifestyml")
            return;
        }
        if (!project.fileExists(".atomist/package.json")) {
            console.log("This project does not appear to configured for TypeScript, see https://github.com/atomist-rugs/rug-editors#addtypescript")
            return;
        }

        let srcGeneratorPath = ".atomist/editors/TypeScriptGenerator.ts";
        let srcTestPath = ".atomist/tests/TypeScriptGenerator.rt";

        let generatorPath = srcGeneratorPath.replace("TypeScriptGenerator", this.generator_name);
        let testPath = srcTestPath.replace("TypeScriptGenerator", this.generator_name);

        project.copyEditorBackingFileOrFail(srcGeneratorPath, generatorPath);
        project.copyEditorBackingFileOrFail(srcTestPath, testPath);

        let lcFirstGeneratorName = this.generator_name[0].toLowerCase() + this.generator_name.slice(1);

        let eng: PathExpressionEngine = project.context().pathExpressionEngine();

        let generatorPathExpression = new PathExpression<Project, File>("/*[@name='.atomist']/editors/*[@name='" + this.generator_name + ".ts']");
        let generatorFile: File = eng.scalar(project, generatorPathExpression) as any;
        generatorFile.replace("TypeScriptGenerator", this.generator_name);
        generatorFile.replace("@DESCRIPTION@", this.description);
        generatorFile.replace("typeScriptGenerator", lcFirstGeneratorName);

        let testPathExpression = new PathExpression<Project, File>("/*[@name='.atomist']/tests/*[@name='" + this.generator_name + ".rt']");
        let testFile: File = eng.scalar(project, testPathExpression) as any;
        testFile.replace("TypeScriptGenerator", this.generator_name);
    }
}

export let addTypeScriptGenerator = new AddTypeScriptGenerator()
