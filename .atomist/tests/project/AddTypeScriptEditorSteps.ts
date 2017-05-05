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

Given("a Rug README", (p: Project) => {
    p.copyEditorBackingFileOrFail("README.md");
});

Given("a Rug archive package.json", (p: Project) => {
    p.addFile(".atomist/package.json", `{"dependencies":{"@atomist/rugs":"1.0.0"}}`);
});

const testEditorName = "JoeHenry";
const testEditorDescription = "Richard Pryor addresses a tearful nation";

When("AddTypeScriptEditor is run", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("AddTypeScriptEditor");
    w.editWith(editor, { editorName: testEditorName, description: testEditorDescription });
});

When("AddTypeScriptEditor is run with no editor name provided", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("AddTypeScriptEditor");
    w.editWith(editor, { description: "Pryor reprise" });
});

const testEditorPath = `.atomist/editors/${testEditorName}.ts`;

Then("the editor file exists", (p: Project, world) => {
    return p.fileExists(testEditorPath);
});

Then("the editor file contains the editor annotation", (p: Project, world) => {
    return p.fileContains(testEditorPath, `@Editor("${testEditorName}"`);
});

Then("the editor file contains the description", (p: Project, world) => {
    return p.fileContains(testEditorPath, `"${testEditorDescription}"`);
});

Then("the editor file contains the editor class", (p: Project, world) => {
    return p.fileContains(testEditorPath, `class ${testEditorName}`);
});

Then("the editor file instantiates the class", (p: Project, world) => {
    return p.fileContains(testEditorPath, `new ${testEditorName}()`);
});

Then("the editor file does not contain the original editor name", (p: Project, world) => {
    return !p.fileContains(testEditorPath, "TypeScriptEditor");
});

Then("the editor file does not contain the original description", (p: Project, world) => {
    return !p.fileContains(testEditorPath, "sample TypeScript editor used by");
});

Then("the editor file does not contain the original export", (p: Project, world) => {
    return !p.fileContains(testEditorPath, "helloTypeScript");
});

const testEditorStepsPath = `.atomist/tests/project/${testEditorName}Steps.ts`;

Then("the editor test steps file exists", (p: Project, world) => {
    return p.fileExists(testEditorStepsPath);
});

const testEditorFeaturePath = `.atomist/tests/project/${testEditorName}Test.feature`;

Then("the editor feature file has the proper scenario", (p: Project, world) => {
    return p.fileContains(testEditorFeaturePath, `Scenario: ${testEditorName}`);
});

Then("the editor test steps file does not contain the original editor name", (p: Project, world) => {
    return !p.fileContains(testEditorStepsPath, "TypeScriptEditor");
});

const readmePath = "README.md";

Then("the README exists", (p: Project, world) => {
    return p.fileExists(readmePath);
});

Then("the README contains a section for the editor", (p: Project, world) => {
    return p.fileContains(readmePath, `### ${testEditorName}`);
});

Then("the README contains the editor description", (p: Project, world) => {
    return p.fileContains(readmePath, testEditorDescription);
});

Then("the README contains default editor prerequisites", (p: Project, world) => {
    return p.fileContains(readmePath, "Put your editor prerequisites here.");
});

Then("the README contains the editor parameter", (p: Project, world) => {
    return p.fileContains(readmePath, "`inputParameter` | Yes | | Example input parameter");
});

Then("the README contains the editor usage", (p: Project, world) => {
    return p.fileContains(readmePath, `-l ${testEditorName} `);
});

Then("the README contains default editor text", (p: Project, world) => {
    return p.fileContains(readmePath, "Explain what your editor does here.");
});

Then("the README does not exist", (p: Project, world) => {
    return !p.fileExists(readmePath);
});

Then("the Rug archive package.json exists", (p: Project, world) => {
    return p.fileExists(".atomist/package.json");
});
