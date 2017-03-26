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

When("ConvertExistingProjectToGenerator for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("ConvertExistingProjectToGenerator");
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    psworld.editWith(editor, { archiveName: "my-rug-archive", groupId: "my-rug-group", version: "0.0.1", manifest: ".atomist/manifest.yml", generatorName: "MyNewGenerator", description: "Description of MyNewGenerator" });
});

Then("fileExists manifest for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(manifest);
});

Then("fileContains manifest artifact archiveName for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(manifest, 'artifact: "' + archiveName + '"');
});

Then("fileContains manifest group groupId for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(manifest, 'group: "' + groupId + '"');
});

Then("fileContains manifest version for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(manifest, version);
});

Then("fileExists atomist package json for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(".atomist/package.json");
});

Then("fileContains atomist package json atomist rug for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/package.json", '"@atomist/rug"');
});

Then("fileExists atomist tsconfig json for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(".atomist/tsconfig.json");
});

Then("fileContains atomist tsconfig json suppressImplicitAnyIndexErrors for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/tsconfig.json", "suppressImplicitAnyIndexErrors");
});

Then("fileExists atomist gitignore for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(".atomist/.gitignore");
});

Then("fileContains atomist gitignore node modules for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/.gitignore", "node_modules");
});

Then("not result directoryExists atomist node modules atomist rug for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.directoryExists(".atomist/node_modules/@atomist/rug");
});

Then("not result fileExists atomist node modules atomist rug model Core ts for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.fileExists(".atomist/node_modules/@atomist/rug/model/Core.ts");
});

Then("fileExists atomist editors MyNewGenerator ts for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(".atomist/generators/MyNewGenerator.ts");
});

Then("fileContains atomist editors MyNewGenerator ts Generator MyNewGenerator for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/generators/MyNewGenerator.ts", '@Generator("MyNewGenerator"');
});

Then("fileContains atomist editors MyNewGenerator ts class MyNewGenerator for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/generators/MyNewGenerator.ts", "class MyNewGenerator");
});

Then("fileContains atomist editors MyNewGenerator ts new MyNewGenerator for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/generators/MyNewGenerator.ts", "new MyNewGenerator()");
});

Then("not result fileContains atomist editors MyNewGenerator ts TypeScriptGenerator for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "TypeScriptGenerator");
});

Then("not result fileContains atomist editors MyNewGenerator ts DESCRIPTION for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "@DESCRIPTION@");
});

Then("not result fileContains atomist editors MyNewGenerator ts typeScriptGenerator for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "typeScriptGenerator");
});

Then("fileExists atomist tests project MyNewGeneratorTest ts for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(".atomist/tests/project/MyNewGeneratorSteps.ts");
});

Then("fileContains atomist tests project MyNewGeneratorTest feature scenario MyNewGenerator for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/tests/project/MyNewGeneratorTest.feature", "Scenario: MyNewGenerator");
});

Then("not result fileContains atomist tests project MyNewGeneratorTest ts TypeScriptGenerator for ConvertExistingProjectToGenerator should add Rug archive files and default generator", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.fileContains(".atomist/tests/project/MyNewGeneratorSteps.ts", "TypeScriptGenerator");
});

Given("a file named README.md for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", p => { p.addFile("README.md", `README.md" = "Beulah`) });

Given("a file named CHANGELOG.md for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", p => { p.addFile("CHANGELOG.md", `CHANGELOG.md" = "Handsome Western States`) });

Given("a file named LICENSE for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", p => { p.addFile("LICENSE", `LICENSE" = "When Your Heartstrings Break`) });

Given("a file named configure for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", p => { p.addFile("configure", `configure" = "The Coast Is Never Clear`) });

When("ConvertExistingProjectToGenerator for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("ConvertExistingProjectToGenerator");
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    psworld.editWith(editor, { archiveName: "my-rug-archive", groupId: "my-rug-group", version: "0.0.1", manifest: ".atomist/manifest.yml", generatorName: "MyNewGenerator", description: "Description of MyNewGenerator" });
});

Then("fileExists manifest for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(manifest);
});

Then("fileContains manifest artifact archiveName for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(manifest, 'artifact: "' + archiveName + '"');
});

Then("fileContains manifest group groupId for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(manifest, 'group: "' + groupId + '"');
});

Then("fileContains manifest version for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(manifest, version);
});

Then("fileExists atomist package json for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(".atomist/package.json");
});

Then("fileContains atomist package json atomist rug for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/package.json", '"@atomist/rug"');
});

Then("fileExists atomist tsconfig json for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(".atomist/tsconfig.json");
});

Then("fileContains atomist tsconfig json suppressImplicitAnyIndexErrors for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/tsconfig.json", "suppressImplicitAnyIndexErrors");
});

Then("fileExists atomist gitignore for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(".atomist/.gitignore");
});

Then("fileContains atomist gitignore node modules for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/.gitignore", "node_modules");
});

Then("not result directoryExists atomist node modules atomist rug for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.directoryExists(".atomist/node_modules/@atomist/rug");
});

Then("not result fileExists atomist node modules atomist rug model Core ts for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.fileExists(".atomist/node_modules/@atomist/rug/model/Core.ts");
});

Then("fileExists atomist editors MyNewGenerator ts for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(".atomist/generators/MyNewGenerator.ts");
});

Then("fileContains atomist editors MyNewGenerator ts Generator MyNewGenerator for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/generators/MyNewGenerator.ts", '@Generator("MyNewGenerator"');
});

Then("fileContains atomist editors MyNewGenerator ts class MyNewGenerator for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/generators/MyNewGenerator.ts", "class MyNewGenerator");
});

Then("fileContains atomist editors MyNewGenerator ts new MyNewGenerator for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/generators/MyNewGenerator.ts", "new MyNewGenerator()");
});

Then("not result fileContains atomist editors MyNewGenerator ts TypeScriptGenerator for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "TypeScriptGenerator");
});

Then("not result fileContains atomist editors MyNewGenerator ts DESCRIPTION for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "@DESCRIPTION@");
});

Then("not result fileContains atomist editors MyNewGenerator ts typeScriptGenerator for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.fileContains(".atomist/generators/MyNewGenerator.ts", "typeScriptGenerator");
});

Then("fileExists atomist tests project MyNewGeneratorTest ts for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileExists(".atomist/tests/project/MyNewGeneratorSteps.ts");
});

Then("fileContains atomist tests project MyNewGeneratorTest feature scenario MyNewGenerator for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/tests/project/MyNewGeneratorTest.feature", "Scenario: MyNewGenerator");
});

Then("not result fileContains atomist tests project MyNewGeneratorTest ts TypeScriptGenerator for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return !p.fileContains(".atomist/tests/project/MyNewGeneratorSteps.ts", "TypeScriptGenerator");
});

Then("fileContains atomist tests project MyNewGeneratorTest ts fileExists README md for ConvertExistingProjectToGenerator should add appropriate generator tests assertions", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    return p.fileContains(".atomist/tests/project/MyNewGeneratorSteps.ts", 'fileExists("README.md")');
});

When("ConvertExistingProjectToGenerator for ConvertExistingProjectToGenerator should make no change if project already contains a manifest", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("ConvertExistingProjectToGenerator");
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let generatorName = "MyNewGenerator";
    let description = "Description of MyNewGenerator";
    psworld.editWith(editor, { archiveName: "my-rug-archive", groupId: "my-rug-group", version: "0.0.1", generatorName: "MyNewGenerator", description: "Description of MyNewGenerator" });
});
