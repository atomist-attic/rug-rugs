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

import { addLocalEditor } from "../../editors/AddLocalEditor";

let testEditorName = "TestEditorName";
let testEditorDescription = "this is just a test";
let testEditorGroup = "testing-group";
let testEditorPath = `.atomist/editors/${testEditorName}.ts`;

When("edit with AddLocalEditor using defaults", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddLocalEditor");
    psworld.editWith(editor, { editorName: testEditorName });
});

When("edit with AddLocalEditor using description", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddLocalEditor");
    let params = {
        editorName: testEditorName,
        description: testEditorDescription,
        groupId: testEditorGroup
    }
    psworld.editWith(editor, params);
});

Then("the new editor file should exist", p => {
    return p.fileExists(testEditorPath);
});

Then("the new editor file should contain the editor name", p => {
    return p.fileContains(testEditorPath, `@Editor("${testEditorName}"`);
});

Then("the new editor file should contain the default description", p => {
    return p.fileContains(testEditorPath, `"${addLocalEditor.description}"`);
});

Then("the new editor file should contain the editor description", p => {
    return p.fileContains(testEditorPath, `"${testEditorDescription}"`);
});

Then("the new editor file should contain the editor class", p => {
    return p.fileContains(testEditorPath, `class ${testEditorName}`);
});

Then("the new editor file should contain the editor instance", p => {
    return p.fileContains(testEditorPath, `new ${testEditorName}()`);
});

Then("the new editor file should not contain the sample editor name", p => {
    return !p.fileContains(testEditorPath, "TypeScriptEditor");
});

Then("the new editor file should not contain the sample editor description", p => {
    return !p.fileContains(testEditorPath, "sample TypeScript editor used by");
});

Then("the new editor file should not contain the sample editor variable", p => {
    return !p.fileContains(testEditorPath, "typeScriptEditor");
});

Then("the new editor feature file should exist", p => {
    return p.fileExists(`.atomist/tests/project/${testEditorName}Test.feature`);
});

Then("the new editor test file should exist", p => {
    return p.fileExists(`.atomist/tests/project/${testEditorName}Steps.ts`);
});

Then("the Atomist directory should exist", p => {
    return p.directoryExists(".atomist");
});

Then("the manifest file should exist", p => {
    return p.fileExists(".atomist/manifest.yml");
});

Then("the npm package file should exist", p => {
    return p.fileExists(".atomist/package.json");
});

Then("the TypeScript typings should exist", p => {
    return p.directoryExists(".atomist/node_modules/@atomist/rug");
});
