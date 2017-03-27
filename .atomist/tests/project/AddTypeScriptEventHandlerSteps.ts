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

Given("a manifest file", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.18.2,1.0.0)"
dependencies:
extensions:
`)
});

Given("an NPM package file", p => {
    p.addFile(".atomist/package.json", `{
  "dependencies": {
    "@atomist/rug": "0.18.2"
  }
}
`)
});

const handlerName = "MyNewHandler";
const description = "This handler rocks";

When("AddTypeScriptEventHandler is run with default path expression", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptEventHandler");
    psworld.editWith(editor, { handlerName: handlerName, description: description });
});

const pathExpression = "/Push()[/on::Repo()/channel::ChatChannel()][/contains::Commit()/author::GitHubId()[/hasGithubIdentity::Person()/hasChatIdentity::ChatId()]?]";

When("AddTypeScriptEventHandler is run providing a path expression", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptEventHandler");
    psworld.editWith(editor, {
        handlerName: handlerName,
        description: description,
        pathExpression: pathExpression
    });
});

const handlerPath = ".atomist/handlers/event/MyNewHandler.ts"

Then("the event handler file exists", (p, world) => {
    return p.fileExists(handlerPath);
});

Then("the event handler file contains the name", (p, world) => {
    return p.fileContains(handlerPath, `class ${handlerName}`);
});

Then("the event handler file contains the description", (p, world) => {
    return p.fileContains(handlerPath, description);
});

Then("the event handler file contains the default path expression", (p, world) => {
    return p.fileContains(handlerPath, "/Tag()");
});

Then("the event handler file contains the provided path expression", (p, world) => {
    return p.fileContains(handlerPath, pathExpression);
});

Then("the event handler file does not contain the original name", (p, world) => {
    return !p.fileContains(handlerPath, "TypeScriptEventHandler");
});

Then("the event handler file does not contain the original description", (p, world) => {
    return !p.fileContains(handlerPath, "sample TypeScript event handler");
});

Then("the event handler file does not contain the original path expression", (p, world) => {
    return !p.fileContains(handlerPath, "/Tag()");
});
