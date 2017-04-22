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

Given("a Rug archive manifest", (p: Project) => {
    p.addFile(".atomist/manifest.yml", `group: non-atomist
artifact: some-rugs
version: "28.8.1963"
requires: "[0.25.3,0.26.0)"
`);
});

When("edit with AddTypeScript", (p, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("AddTypeScript");
    w.editWith(editor, {});
});

Then("there should be a package file", (p: Project) => {
    return p.fileExists(".atomist/package.json");
});

Then("the package file depends on rug", (p: Project) => {
    return p.fileContains(".atomist/package.json", '"@atomist/rugs"');
});

Then("there should be a tsconfig file", (p: Project) => {
    return p.fileExists(".atomist/tsconfig.json");
});

Then("the tsconfig file should have standard contents", (p: Project) => {
    return p.fileContains(".atomist/tsconfig.json", "suppressImplicitAnyIndexErrors");
});

Then("there should be a gitignore file", (p: Project) => {
    return p.fileExists(".atomist/.gitignore");
});

Then("the gitignore file should ignore node modules", (p: Project) => {
    return p.fileContains(".atomist/.gitignore", "node_modules");
});

Then("the node modules directory should not exist", (p: Project) => {
    return !p.directoryExists(".atomist/node_modules/@atomist/rug");
});

Then("the rug interfaces should not exist", (p: Project) => {
    return !p.fileExists(".atomist/node_modules/@atomist/rug/model/Core.ts");
});
