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

const pName = "new-starter-project";

When("NewStarterRugProject for NewStarterRugProjectTestProject", (p, world) => {
    const w = world as ProjectScenarioWorld;
    const generator = w.generator("NewStarterRugProject");
    w.generateWith(generator, pName, {});
});

Then("fileExists atomist manifest yml for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileExists(".atomist/manifest.yml");
});

Then("fileContains atomist manifest yml 0 1 0 for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileContains(".atomist/manifest.yml", "0.1.0");
});

Then("fileContains atomist manifest yml pName for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileContains(".atomist/manifest.yml", pName);
});

Then("fileContains atomist manifest yml atomist rugs for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileContains(".atomist/manifest.yml", "atomist-contrib");
});

Then("fileExists CHANGELOG md for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileExists("CHANGELOG.md");
});

Then("fileContains CHANGELOG md 0 1 0 for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileContains("CHANGELOG.md", "[0.1.0]");
});

Then("the change log contains header", (p, world) => {
    return p.fileContains("CHANGELOG.md", "All notable changes to this project will be documented in this file.");
});

Then("the change log contains the proper compare link", (p, world) => {
    return p.fileContains("CHANGELOG.md", "https://github.com/atomist-contrib/" + pName + "/compare/0.1.0...HEAD");
});

Then("not result fileContains CHANGELOG md rug editors for NewStarterRugProjectTestProject", (p, world) => {
    return !p.fileContains("CHANGELOG.md", "rug-rugs");
});

Then("not result fileContains CHANGELOG md 0 2 0 for NewStarterRugProjectTestProject", (p, world) => {
    return !p.fileContains("CHANGELOG.md", "0.2.0");
});

Then("not result fileContains CHANGELOG md NewRugProject for NewStarterRugProjectTestProject", (p, world) => {
    return !p.fileContains("CHANGELOG.md", "NewRugProject");
});

Then("not result fileExists travis yml for NewStarterRugProjectTestProject", (p, world) => {
    return !p.fileExists(".travis.yml");
});

Then("fileExists LICENSE for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileExists("LICENSE");
});

Then("the license file contains the appendix", (p, world) => {
    return p.fileContains("LICENSE", "APPENDIX: How to apply the Apache License to your work.");
});

Then("fileExists README md for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileExists("README.md");
});

Then("fileContains README md pName for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileContains("README.md", "# " + pName);
});

Then("not result fileContains README md Atomist rug editors for NewStarterRugProjectTestProject", (p, world) => {
    return !p.fileContains("README.md", "Atomist 'rug-rugs'");
});

Then("fileContains README md Atomist Rug archive project for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileContains("README.md", "Atomist Rug archive project");
});

Then("the readme does not contain the old description", (p, world) => {
    return !p.fileContains("README.md", "editors to create a Rug archive project");
});

Then("the readme does not contain information on the AddTypeScipt editor", (p, world) => {
    return !p.fileContains("README.md", "AddTypeScript editor adds support files");
});

Then("the readme contains the correct Travis CI badge link", (p, world) => {
    return p.fileContains("README.md", "https://travis-ci.org/atomist-contrib/" + pName + ".svg?branch=master");
});

Then("the readme contains the join atomist-communirty badge", (p, world) => {
    return p.fileContains("README.md",
        "[![Slack Status](https://join.atomist.com/badge.svg)](https://join.atomist.com)");
});

Then("not result fileContains README md NewRugProject for NewStarterRugProjectTestProject", (p, world) => {
    return !p.fileContains("README.md", "### NewRugProject");
});

Then("not result fileContains README md ruggery for NewStarterRugProjectTestProject", (p, world) => {
    return !p.fileContains("README.md", "ruggery");
});

Then("fileContains README md rug http docs atomist com for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileContains("README.md", "[rug]: http://docs.atomist.com/");
});

Then("fileContains README md Support for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileContains("README.md", "## Support");
});

Then("fileContains README md Development for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileContains("README.md", "## Development");
});

Then("fileContains README md Created by Atomist atomist for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileContains("README.md", "---\nCreated by [Atomist][atomist].");
});

Then("fileContains README md Need Help Join our Slack team slack for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileContains("README.md", "Need Help?  [Join our Slack team][slack].");
});

Then("fileExists atomist tsconfig json for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileExists(".atomist/tsconfig.json");
});

Then("the tsconfig file declares experimental decorator support", (p, world) => {
    return p.fileContains(".atomist/tsconfig.json", '"experimentalDecorators": true');
});

Then("fileExists atomist package json for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileExists(".atomist/package.json");
});

Then("directoryExists atomist node modules atomist rug for NewStarterRugProjectTestProject", (p, world) => {
    return p.directoryExists(".atomist/node_modules/@atomist/rug");
});

Then("fileExists atomist node modules atomist rug model Project ts for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileExists(".atomist/node_modules/@atomist/rug/model/Project.ts");
});

Then("fileExists atomist editors MyFirstEditor ts for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileExists(".atomist/editors/MyFirstEditor.ts");
});

Then("the starter editor contains the starter description", (p, world) => {
    return p.fileContains(".atomist/editors/MyFirstEditor.ts", '"sample Rug TypeScript editor"');
});

Then("fileExists atomist tests project MyFirstEditorTest feature for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileExists(".atomist/tests/project/MyFirstEditorTest.feature");
});

Then("fileExists atomist tests project MyFirstEditorTest ts for NewStarterRugProjectTestProject", (p, world) => {
    return p.fileExists(".atomist/tests/project/MyFirstEditorSteps.ts");
});

Then("the test file contains a reference to the sample editor", (p, world) => {
    return p.fileContains(".atomist/tests/project/MyFirstEditorSteps.ts", "MyFirstEditor");
});

Then("the starter command handler file exists", (p) => {
    return p.fileExists(".atomist/handlers/command/MyFirstCommandHandler.ts");
});

Then("the starter event handler file exists", (p) => {
    return p.fileExists(".atomist/handlers/event/MyFirstEventHandler.ts");
});
