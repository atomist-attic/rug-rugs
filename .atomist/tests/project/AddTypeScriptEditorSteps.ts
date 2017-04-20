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

When("AddTypeScriptEditor editorNameisMyNewEditor, descriptionisThe newest of the new for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptEditor");

    psworld.editWith(editor, { editorName: "MyNewEditor", description: "The newest of the new" });
});

Then("fileExists atomist editors MyNewEditor ts for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileExists(".atomist/editors/MyNewEditor.ts");
});

Then("fileContains atomist editors MyNewEditor ts Editor MyNewEditor for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileContains(".atomist/editors/MyNewEditor.ts", '@Editor("MyNewEditor"');
});

Then("fileContains atomist editors MyNewEditor ts description for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {
    let description = "The newest of the new";
    return p.fileContains(".atomist/editors/MyNewEditor.ts", '"' + description + '"');
});

Then("fileContains atomist editors MyNewEditor ts class MyNewEditor for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileContains(".atomist/editors/MyNewEditor.ts", "class MyNewEditor");
});

Then("fileContains atomist editors MyNewEditor ts new MyNewEditor for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileContains(".atomist/editors/MyNewEditor.ts", "new MyNewEditor()");
});

Then("not result fileContains atomist editors MyNewEditor ts TypeScriptEditor for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return !p.fileContains(".atomist/editors/MyNewEditor.ts", "TypeScriptEditor");
});

Then("not result fileContains atomist editors MyNewEditor ts sample TypeScript editor used by for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return !p.fileContains(".atomist/editors/MyNewEditor.ts", "sample TypeScript editor used by");
});

Then("not result fileContains atomist editors MyNewEditor ts helloTypeScript for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return !p.fileContains(".atomist/editors/MyNewEditor.ts", "helloTypeScript");
});

Then("fileExists atomist tests project MyNewEditorTest ts for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileExists(".atomist/tests/project/MyNewEditorSteps.ts");
});

Then("fileContains atomist tests project MyNewEditorTest ts scenario MyNewEditor for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileContains(".atomist/tests/project/MyNewEditorTest.feature", "Scenario: MyNewEditor");
});

Then("not result fileContains atomist tests project MyNewEditorTest ts TypeScriptEditor for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return !p.fileContains(".atomist/tests/project/MyNewEditorSteps.ts", "TypeScriptEditor");
});

Then("fileExists README md for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileExists("README.md");
});

Then("fileContains README md MyNewEditor for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileContains("README.md", "### MyNewEditor");
});

Then("fileContains README md The newest of the new for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileContains("README.md", "The newest of the new");
});

Then("fileContains README md Put your editor prerequisites here for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileContains("README.md", "Put your editor prerequisites here.");
});

Then("fileContains README md inputParameter Yes Example input parameter for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileContains("README.md", "`inputParameter` | Yes | | Example input parameter");
});

Then("fileContains README md MyNewEditor usage for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileContains("README.md", "-l MyNewEditor ");
});

Then("fileContains README md Explain what your editor does here for AddTypeScriptEditor should add a TypeScript editor to a Rug archive", (p, world) => {

    return p.fileContains("README.md", "Explain what your editor does here.");
});

Given("a file named .atomist/manifest.yml for AddTypeScriptEditor should add a TypeScript editor even if no README", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.12.0,1.0.0)"
dependencies:
extensions:
`)
});

Given("a file named .atomist/package.json for AddTypeScriptEditor should add a TypeScript editor even if no README", p => { p.addFile(".atomist/package.json", `{"dependencies":{"@atomist/rug":"0.12.0"}}`) });

When("AddTypeScriptEditor editorNameisMyNewEditor, descriptionisThe newest of the new for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptEditor");

    psworld.editWith(editor, { editorName: "MyNewEditor", description: "The newest of the new" });
});

Then("fileExists atomist editors MyNewEditor ts for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {

    return p.fileExists(".atomist/editors/MyNewEditor.ts");
});

Then("fileContains atomist editors MyNewEditor ts Editor MyNewEditor for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {

    return p.fileContains(".atomist/editors/MyNewEditor.ts", '@Editor("MyNewEditor"');
});

Then("fileContains atomist editors MyNewEditor ts description for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {
    let description = "The newest of the new";
    return p.fileContains(".atomist/editors/MyNewEditor.ts", '"' + description + '"');
});

Then("fileContains atomist editors MyNewEditor ts class MyNewEditor for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {

    return p.fileContains(".atomist/editors/MyNewEditor.ts", "class MyNewEditor");
});

Then("fileContains atomist editors MyNewEditor ts new MyNewEditor for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {

    return p.fileContains(".atomist/editors/MyNewEditor.ts", "new MyNewEditor()");
});

Then("not result fileContains atomist editors MyNewEditor ts TypeScriptEditor for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {

    return !p.fileContains(".atomist/editors/MyNewEditor.ts", "TypeScriptEditor");
});

Then("not result fileContains atomist editors MyNewEditor ts sample TypeScript editor used by for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {

    return !p.fileContains(".atomist/editors/MyNewEditor.ts", "sample TypeScript editor used by");
});

Then("not result fileContains atomist editors MyNewEditor ts helloTypeScript for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {

    return !p.fileContains(".atomist/editors/MyNewEditor.ts", "helloTypeScript");
});

Then("fileExists atomist tests project MyNewEditorTest ts for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {

    return p.fileExists(".atomist/tests/project/MyNewEditorSteps.ts");
});

Then("fileContains atomist tests project MyNewEditorTest ts scenario MyNewEditor for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {

    return p.fileContains(".atomist/tests/project/MyNewEditorTest.feature", "Scenario: MyNewEditor");
});

Then("not result fileContains atomist tests project MyNewEditorTest ts TypeScriptEditor for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {

    return !p.fileContains(".atomist/tests/project/MyNewEditorSteps.ts", "TypeScriptEditor");
});

Then("not result fileExists README md for AddTypeScriptEditor should add a TypeScript editor even if no README", (p, world) => {

    return !p.fileExists("README.md");
});

Given("a file named .atomist/package.json for AddTypeScriptEditor should not make any changes if the target project is not a Rug archive", p => { p.addFile(".atomist/package.json", `{"dependencies":{"@atomist/rug":"0.12.0"}}`) });

When("AddTypeScriptEditor editorNameisSillyPerson, descriptionisDance! for AddTypeScriptEditor should not make any changes if the target project is not a Rug archive", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptEditor");

    psworld.editWith(editor, { editorName: "SillyPerson", description: "Dance!" });
});

Given("a file named .atomist/manifest.yml for AddTypeScriptEditor should make ready for typescript if not ready", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.12.0,1.0.0)"
dependencies:
extensions:
`)
});

When("AddTypeScriptEditor editorNameisSillyPerson, descriptionisDance! for AddTypeScriptEditor should make ready for typescript if not ready", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptEditor");

    psworld.editWith(editor, { editorName: "SillyPerson", description: "Dance!" });
});

Then("fileExists atomist editors SillyPerson ts for AddTypeScriptEditor should make ready for typescript if not ready", (p, world) => {

    return p.fileExists(".atomist/editors/SillyPerson.ts");
});

Then("fileContains atomist editors SillyPerson ts Editor SillyPerson for AddTypeScriptEditor should make ready for typescript if not ready", (p, world) => {

    return p.fileContains(".atomist/editors/SillyPerson.ts", '@Editor("SillyPerson"');
});

Then("fileExists atomist package json for AddTypeScriptEditor should make ready for typescript if not ready", (p, world) => {

    return p.fileExists(".atomist/package.json");
});

Given("a file named .atomist/manifest.yml for AddTypeScriptEditor should fail if no editor name provided", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.12.0,1.0.0)"
dependencies:
extensions:
`)
});

Given("a file named .atomist/package.json for AddTypeScriptEditor should fail if no editor name provided", p => { p.addFile(".atomist/package.json", `{"dependencies":{"@atomist/rug":"0.12.0"}}`) });

When("AddTypeScriptEditor descriptionisDance! for AddTypeScriptEditor should fail if no editor name provided", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptEditor");

    psworld.editWith(editor, { description: "Dance!" });
});
