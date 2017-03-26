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

Given("a file named .atomist/manifest.yml for AddTypeScriptHandler should add a new blank handler using default tree expression to Rug project", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.12.0,1.0.0)"
dependencies:
extensions:
`)
});

Given("a file named .atomist/package.json for AddTypeScriptHandler should add a new blank handler using default tree expression to Rug project", p => {
    p.addFile(".atomist/package.json", `{
  "dependencies": {
    "@atomist/rug": "0.12.0"
  }
}
`)
});

When("AddTypeScriptHandler for AddTypeScriptHandler should add a new blank handler using default tree expression to Rug project", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptHandler");
    let handlerName = "MyNewHandler";
    let projectName = "MyProject";
    let description = "This handler rocks";
    psworld.editWith(editor, { handlerName: "MyNewHandler", projectName: "MyProject", description: "This handler rocks" });
});

Then("fileExists atomist handlers MyNewHandler ts for AddTypeScriptHandler should add a new blank handler using default tree expression to Rug project", (p, world) => {
    let handlerName = "MyNewHandler";
    let projectName = "MyProject";
    let description = "This handler rocks";
    return p.fileExists(".atomist/handlers/MyNewHandler.ts");
});

Then("fileContains atomist handlers MyNewHandler ts Tag for AddTypeScriptHandler should add a new blank handler using default tree expression to Rug project", (p, world) => {
    let handlerName = "MyNewHandler";
    let projectName = "MyProject";
    let description = "This handler rocks";
    return p.fileContains(".atomist/handlers/MyNewHandler.ts", "/Tag()");
});

Given("a file named .atomist/manifest.yml for AddTypeScriptHandler should add a new blank handler to an existing Rug project", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.12.0,1.0.0)"
dependencies:
extensions:
`)
});

Given("a file named .atomist/package.json for AddTypeScriptHandler should add a new blank handler to an existing Rug project", p => {
    p.addFile(".atomist/package.json", `{
  "dependencies": {
    "@atomist/rug": "0.12.0"
  }
}
`)
});

When("AddTypeScriptHandler for AddTypeScriptHandler should add a new blank handler to an existing Rug project", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptHandler");
    let handlerName = "MyNewHandler";
    let projectName = "MyProject";
    let description = "This handler rocks";
    let pathExpression = "/Push()[/on::Repo()/channel::ChatChannel()][/contains::Commit()/author::GitHubId()[/hasGithubIdentity::Person()/hasChatIdentity::ChatId()]?]";
    psworld.editWith(editor, { handlerName: "MyNewHandler", projectName: "MyProject", description: "This handler rocks", pathExpression: "/Push()[/on::Repo()/channel::ChatChannel()][/contains::Commit()/author::GitHubId()[/hasGithubIdentity::Person()/hasChatIdentity::ChatId()]?]" });
});

Then("fileExists atomist handlers MyNewHandler ts for AddTypeScriptHandler should add a new blank handler to an existing Rug project", (p, world) => {
    let handlerName = "MyNewHandler";
    let projectName = "MyProject";
    let description = "This handler rocks";
    let pathExpression = "/Push()[/on::Repo()/channel::ChatChannel()][/contains::Commit()/author::GitHubId()[/hasGithubIdentity::Person()/hasChatIdentity::ChatId()]?]";
    return p.fileExists(".atomist/handlers/MyNewHandler.ts");
});

Then("fileContains atomist handlers MyNewHandler ts Push on Repo channel ChatChannel contains Commit author GitHubId hasGithubIdentity Person hasChatIdentity ChatId for AddTypeScriptHandler should add a new blank handler to an existing Rug project", (p, world) => {
    let handlerName = "MyNewHandler";
    let projectName = "MyProject";
    let description = "This handler rocks";
    let pathExpression = "/Push()[/on::Repo()/channel::ChatChannel()][/contains::Commit()/author::GitHubId()[/hasGithubIdentity::Person()/hasChatIdentity::ChatId()]?]";
    return p.fileContains(".atomist/handlers/MyNewHandler.ts", "/Push()[/on::Repo()/channel::ChatChannel()][/contains::Commit()/author::GitHubId()[/hasGithubIdentity::Person()/hasChatIdentity::ChatId()]?]");
});

Then("not result fileContains atomist handlers MyNewHandler ts Tag for AddTypeScriptHandler should add a new blank handler to an existing Rug project", (p, world) => {
    let handlerName = "MyNewHandler";
    let projectName = "MyProject";
    let description = "This handler rocks";
    let pathExpression = "/Push()[/on::Repo()/channel::ChatChannel()][/contains::Commit()/author::GitHubId()[/hasGithubIdentity::Person()/hasChatIdentity::ChatId()]?]";
    return !p.fileContains(".atomist/handlers/MyNewHandler.ts", "/Tag()");
});

When("AddTypeScriptHandler for AddTypeScriptHandler should fail if not a Rug project", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptHandler");
    let handlerName = "MyNewExecutor";
    let projectName = "MyProject";
    let description = "This executor rocks";
    psworld.editWith(editor, { handlerName: "MyNewExecutor", projectName: "MyProject", description: "This executor rocks" });
});
