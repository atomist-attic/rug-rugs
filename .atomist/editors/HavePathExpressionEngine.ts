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
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { File } from '@atomist/rug/model/File'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Editor("HavePathExpressionEngine", "get access to a path expression engine in a Rug editor")
@Tags("rug")
export class HavePathExpressionEngine implements EditProject {

    @Parameter({
        displayName: "Rug to modify",
        description: "name of a TypeScript rug",
        pattern: Pattern.any,
        validInput: "an existing TypeScript rug in your repository",
        minLength: 1,
        maxLength: 100
    })
    rug_name: string;

    edit(project: Project) {
        let eng: PathExpressionEngine = project.context().pathExpressionEngine();

        eng.with<File>(project, `/*[@name=".atomist"]/editors/*[@name='${this.rug_name}.ts']`, rug => {
            console.log(`Found file ${rug.path()}`)
            if (!rug.contains("project.context().pathExpressionEngine()")) {
                // microgrammars would look better. Need rug 0.13
                rug.regexpReplace("(edit\\(.*\\) \\{)", "$1\n        let eng: PathExpressionEngine = project.context().pathExpressionEngine();\n");
            }
            if (!rug.contains("import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'")) {
                // if we had a TypeScript language extension, "add import" would be a thing
                rug.prepend("import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'\n");
            }

        });
    }
}

export const havePathExpressionEngine = new HavePathExpressionEngine();
