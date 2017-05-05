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

import { Project } from "@atomist/rug/model/Project";
import { Given, ProjectScenarioWorld, Then, When } from "@atomist/rug/test/project/Core";

const target = ".atomist/editors/TypeScriptEditor.ts";

Given("a TypeScript editor", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    p.copyEditorBackingFileOrFail(target);
});

When("HavePathExpressionEngine is run on TypeScriptEditor", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("HavePathExpressionEngine");
    w.editWith(editor, { rugName: "TypeScriptEditor", target });
});

Then("TypeScriptEditor has a path expression const", (p, world) => {
    return p.fileContains(target, "const eng: PathExpressionEngine = project.context.pathExpressionEngine;");
});

Then("TypeScriptEditor has the path expression imports", (p, world) => {
    return p.fileContains(target,
        `import { PathExpression, PathExpressionEngine } from "@atomist/rug/tree/PathExpression"`);
});
