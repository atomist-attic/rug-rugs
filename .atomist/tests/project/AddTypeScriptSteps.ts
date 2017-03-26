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

Given("a file named .atomist/manifest.yml", p => {
    p.addFile(".atomist/manifest.yml", "requires: \"0.12.0\"\n");
});

When("edit with AddTypeScript", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScript");
    psworld.editWith(editor, {});
});

Then("there should be a package file", p => {
    return p.fileExists(".atomist/package.json");
});

Then("the package file depends on rug", p => {
    return p.fileContains(".atomist/package.json", '"@atomist/rug"');
});

Then("there should be a tsconfig file", p => {
    return p.fileExists(".atomist/tsconfig.json");
});

Then("the tsconfig file should have standard contents", p => {
    return p.fileContains(".atomist/tsconfig.json", "suppressImplicitAnyIndexErrors");
});

Then("there should be a gitignore file", p => {
    return p.fileExists(".atomist/.gitignore");
});

Then("the gitignore file should ignore node modules", p => {
    return p.fileContains(".atomist/.gitignore", "node_modules");
});

Then("the node modules directory should not exist", p => {
    return !p.directoryExists(".atomist/node_modules/@atomist/rug");
});

Then("the rug interfaces should not exist", p => {
    return !p.fileExists(".atomist/node_modules/@atomist/rug/model/Core.ts");
});
