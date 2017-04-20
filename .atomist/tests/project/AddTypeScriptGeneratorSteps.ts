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

When("AddTypeScriptGenerator generatorName is MyNewGenerator, description is Description of MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptGenerator");

    psworld.editWith(editor, { generatorName: "MyNewGenerator", description: "Description of MyNewGenerator" });
});

Then("fileExists atomist editors MyNewGenerator ts for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileExists(".atomist/generators/MyNewGenerator.ts");
});

Then("fileContains atomist editors MyNewGenerator ts Generator MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileContains(".atomist/generators/MyNewGenerator.ts", '@Generator("MyNewGenerator"');
});

Then("fileContains atomist editors MyNewGenerator ts description for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/generators/MyNewGenerator.ts", '"' + description + '"');
});

Then("fileContains atomist editors MyNewGenerator ts class MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileContains(".atomist/generators/MyNewGenerator.ts", "class MyNewGenerator");
});

Then("fileContains atomist editors MyNewGenerator ts new MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileContains(".atomist/generators/MyNewGenerator.ts", "new MyNewGenerator()");
});

Then("not result fileContains atomist editors MyNewGenerator ts TypeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "TypeScriptGenerator");
});

Then("not result fileContains atomist editors MyNewGenerator ts sample TypeScript generator used by for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "sample TypeScript generator used by");
});

Then("not result fileContains atomist editors MyNewGenerator ts typeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "typeScriptGenerator");
});

Then("fileExists atomist tests project MyNewGeneratorTest ts for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileExists(".atomist/tests/project/MyNewGeneratorSteps.ts");
});

Then("fileContains atomist tests project MyNewGeneratorTest ts scenario MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileContains(".atomist/tests/project/MyNewGeneratorTest.feature", "Scenario: MyNewGenerator");
});

Then("not result fileContains atomist tests project MyNewGeneratorTest ts TypeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return !p.fileContains(".atomist/tests/project/MyNewGeneratorSteps.ts", "TypeScriptGenerator");
});

Then("fileExists README md for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileExists("README.md");
});

Then("fileContains README md MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileContains("README.md", "### MyNewGenerator");
});

Then("fileContains README md Description of MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileContains("README.md", "Description of MyNewGenerator");
});

Then("fileContains README md This Rug has no prerequisites for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileContains("README.md", "This Rug has no prerequisites.");
});

Then("fileContains README md projectName Yes Name of project to be created for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileContains("README.md", "`projectName` | Yes | | Name of project to be created");
});

Then("fileContains README md MyNewGenerator example for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileContains("README.md", "-l MyNewGenerator ");
});

Then("fileContains README md Explain what your generator does here for AddTypeScriptGenerator should add a new TypeScript generator to an existing Rug Archive project", (p, world) => {

    return p.fileContains("README.md", "Explain what your generator does here.");
});

Given("a file named .atomist/manifest.yml for AddTypeScriptGenerator should add a new TypeScript generator even if no README", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.12.0,1.0.0)"
dependencies:
extensions:
`)
});

Given("a file named .atomist/package.json for AddTypeScriptGenerator should add a new TypeScript generator even if no README", p => { p.addFile(".atomist/package.json", `{"dependencies":{"@atomist/rug":"0.12.0"}}`) });

When("AddTypeScriptGenerator generatorName is MyNewGenerator, description is Description of MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptGenerator");

    psworld.editWith(editor, { generatorName: "MyNewGenerator", description: "Description of MyNewGenerator" });
});

Then("fileExists atomist editors MyNewGenerator ts for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {

    return p.fileExists(".atomist/generators/MyNewGenerator.ts");
});

Then("fileContains atomist editors MyNewGenerator ts Generator MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {

    return p.fileContains(".atomist/generators/MyNewGenerator.ts", '@Generator("MyNewGenerator"');
});

Then("fileContains atomist editors MyNewGenerator ts description for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/generators/MyNewGenerator.ts", '"' + description + '"');
});

Then("fileContains atomist editors MyNewGenerator ts class MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {

    return p.fileContains(".atomist/generators/MyNewGenerator.ts", "class MyNewGenerator");
});

Then("fileContains atomist editors MyNewGenerator ts new MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {

    return p.fileContains(".atomist/generators/MyNewGenerator.ts", "new MyNewGenerator()");
});

Then("not result fileContains atomist editors MyNewGenerator ts TypeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {

    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "TypeScriptGenerator");
});

Then("not result fileContains atomist editors MyNewGenerator ts sample TypeScript generator used by for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {

    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "sample TypeScript generator used by");
});

Then("not result fileContains atomist editors MyNewGenerator ts typeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {

    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "typeScriptGenerator");
});

Then("fileExists atomist tests project MyNewGeneratorTest ts for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {

    return p.fileExists(".atomist/tests/project/MyNewGeneratorSteps.ts");
});

Then("fileContains atomist tests project MyNewGeneratorTest ts scenario MyNewGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {

    return p.fileContains(".atomist/tests/project/MyNewGeneratorTest.feature", "Scenario: MyNewGenerator");
});

Then("not result fileContains atomist tests project MyNewGeneratorTest ts TypeScriptGenerator for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {

    return !p.fileContains(".atomist/tests/project/MyNewGeneratorSteps.ts", "TypeScriptGenerator");
});

Then("not result fileExists README md for AddTypeScriptGenerator should add a new TypeScript generator even if no README", (p, world) => {

    return !p.fileExists("README.md");
});

Given("a file named .atomist/package.json for AddTypeScriptGenerator should make no changes if no manifest.yml", p => { p.addFile(".atomist/package.json", `{"dependencies":{"@atomist/rug":"0.12.0"}}`) });

When("AddTypeScriptGenerator generatorName is MyNewGenerator, description is Description of MyNewGenerator for AddTypeScriptGenerator should make no changes if no manifest.yml", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptGenerator");

    psworld.editWith(editor, { generatorName: "MyNewGenerator", description: "Description of MyNewGenerator" });
});

Given("a file named .atomist/manifest.yml for AddTypeScriptGenerator should add package.json if not preset", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.12.0,1.0.0)"
dependencies:
extensions:
`)
});

When("AddTypeScriptGenerator generatorName is MyNewGenerator, description is Description of MyNewGenerator for AddTypeScriptGenerator should add package.json if not preset", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptGenerator");

    psworld.editWith(editor, { generatorName: "MyNewGenerator", description: "Description of MyNewGenerator" });
});

Then("fileExists atomist editors MyNewGenerator ts for AddTypeScriptGenerator should add package json if not preset", (p, world) => {

    return p.fileExists(".atomist/generators/MyNewGenerator.ts");
});

Then("fileExists atomist package json for AddTypeScriptGenerator should add package json if not preset", (p, world) => {

    return p.fileExists(".atomist/package.json");
});

Given("a file named .atomist/manifest.yml for AddTypeScriptGenerator should fail if no generator name provided", p => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: "0.1.0"
requires: "[0.12.0,1.0.0)"
dependencies:
extensions:
`)
});

Given("a file named .atomist/package.json for AddTypeScriptGenerator should fail if no generator name provided", p => { p.addFile(".atomist/package.json", `{"dependencies":{"@atomist/rug":"0.12.0"}}`) });

When("AddTypeScriptGenerator descriptionisSomething wicked this way comes for AddTypeScriptGenerator should fail if no generator name provided", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddTypeScriptGenerator");

    psworld.editWith(editor, { description: "Something wicked this way comes" });
});
