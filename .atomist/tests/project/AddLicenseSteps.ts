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

Given("a mix of TypeScript files and non TS files", (p: Project) => {
    p.addFile("src/hello1.ts", `export class MyClass1 {};`);
    p.addFile("src/subdir/hello2.ts", `export class MyClass2 {};`);
    p.addFile("src/hello3.txt", `some random file`);
    p.addFile("test/hello4.ts", `export class MyClass4 {};`);
    p.addFile("other/hello4.ts", `export class MyClass4 {};`);
});

When("the AddLicense is run", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("AddLicense");
    w.editWith(editor, { include: "src, test" });
});

Then("the project has new LICENSE", (p: Project, world) => {
    return p.fileExists("LICENSE") &&
        p.fileContains("LICENSE", "apache");
});

Then("the hello1.ts file has license", (p: Project, world) => {
    return p.fileContains("src/hello1.ts", "Licensed under");
});

Then("the hello2.ts file has license", (p: Project, world) => {
    return p.fileContains("src/subdir/hello2.ts", "Licensed under");
});

Then("the hello3.txt file does not have license", (p: Project, world) => {
    return !p.fileContains("src/hello3.txt", "Licensed under");
});

Then("the test/hello4.ts has license", (p: Project, world) => {
    return p.fileContains("test/hello4.ts", "Licensed under");
});

Then("the other/hello4.ts file does not have license", (p: Project, world) => {
    return !p.fileContains("other/hello4.ts", "Licensed under");
});

Then("the hello1.ts file has previous code", (p: Project, world) => {
    return p.fileContains("src/hello1.ts", "export class MyClass1 {};");
});

Given("project with existing license and some TypeScript files", (p: Project) => {
    p.addFile("LICENSE", "custom license");
    p.addFile("hello5.ts", `export class MyClass5 {};`);
    p.addFile("src/hello6.ts", `export class MyClass6 {};`);
    p.addFile("test/hello7.ts", `export class MyClass7 {};`);
});

When("the AddLicense is run without include parameter", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("AddLicense");
    w.editWith(editor, {});
});

Then("the project has old LICENSE", (p: Project, world) => {
    return p.fileExists("LICENSE") &&
        p.fileHasContent("LICENSE", "custom license");
});

Then("the hello5.ts file has license", (p: Project, world) => {
    return p.fileContains("hello5.ts", "Licensed under");
});

Then("the hello6.ts file has license", (p: Project, world) => {
    return p.fileContains("src/hello6.ts", "Licensed under");
});

Then("the hello7.ts file has license", (p: Project, world) => {
    return p.fileContains("test/hello7.ts", "Licensed under");
});
