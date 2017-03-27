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
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

const handlerName = "MyNewHandler";
const description = "This handler rocks";
const intent = "rock and roll";

When("AddTypeScriptCommandHandler is run", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptCommandHandler");
    psworld.editWith(editor, {
        handlerName: handlerName,
        description: description,
        intent: intent
    });
});

const handlerPath = ".atomist/handlers/command/MyNewHandler.ts"

Then("the command handler file exists", (p, world) => {
    return p.fileExists(handlerPath);
});

Then("the command handler file contains the name", (p, world) => {
    return p.fileContains(handlerPath, `class ${handlerName}`);
});

Then("the command handler file contains the description", (p, world) => {
    return p.fileContains(handlerPath, description);
});

Then("the command handler file contains the intent", (p, world) => {
    return p.fileContains(handlerPath, `@Intent("${intent}")`);
});

Then("the command handler file does not contain the original name", (p, world) => {
    return !p.fileContains(handlerPath, "TypeScriptCommandHandler");
});

Then("the command handler file does not contain the original description", (p, world) => {
    return !p.fileContains(handlerPath, "sample TypeScript command handler");
});

Then("the command handler file does not contain the original intent", (p, world) => {
    return !p.fileContains(handlerPath, "run TypeScriptCommandHandler");
});
