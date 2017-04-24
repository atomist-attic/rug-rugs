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

Given("a Travis CI config", (p: Project) => {
    p.addFile(".travis.yml", `dist: trusty
language: java
jdk:
- oraclejdk8
env:
  global:
  - MAVEN_BASE_URL=https://atomist.jfrog.io/atomist
install:
- nvm install 6.9.2
script: bash .atomist/build/travis-build.bash
`);
});

Given("an NPM package file", (p: Project) => {
    p.addFile(".atomist/package.json", `{
  "dependencies": {
    "@atomist/rugs": "^0.24.2",
    "mustache": "^2.3.0"
  },
  "devDependencies": {
    "@types/mustache": "^0.8.29"
  }
}
`);
});

Given("old build CLI configs", (p: Project) => {
    p.addFile(".atomist/build/cli-build.yml", "chavo: guerrero");
    p.addFile(".atomist/build/cli-dev.yml", "foreign: object");
    p.addFile(".atomist/build/cli-publish.yml", "choked: out");
});

When("edit with UpdateSupportFiles", (p, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("UpdateSupportFiles");
    w.editWith(editor, {});
});

Then("the tsconfig file should set output directory", (p: Project) => {
    return p.fileContains(".atomist/tsconfig.json", "outDir");
});

Then("the gitignore file should ignore npm logs", (p: Project) => {
    return p.fileContains(".atomist/.gitignore", "npm-debug.log");
});

Then("there should be a tslint file", (p: Project) => {
    return p.fileExists(".atomist/tslint.json");
});

Then("there should be a CLI config file", (p: Project) => {
    return p.fileExists(".atomist/build/cli.yml");
});

Then("there should not be deprecated CLI config files", (p: Project) => {
    return !p.fileExists(".atomist/build/cli-build.yml") &&
        !p.fileExists(".atomist/build/cli-dev.yml") &&
        !p.fileExists(".atomist/build/cli-release.yml");
});

Then("the travis build script should set team ID", (p: Project) => {
    return p.fileContains(".atomist/build/travis-build.bash", "export TEAM_ID=");
});

Then("the travis config should install yarn", (p: Project) => {
    return p.fileContains(".travis.yml", "install: nvm install 6.9.2 && npm install -g yarn");
});

const packageJson = ".atomist/package.json";

Then("the package file depends on the right rugs version", (p: Project) => {
    const tmpFile = "package.tmp";
    p.copyEditorBackingFileOrFailToDestination(packageJson, tmpFile);
    const pkgJsonObj = JSON.parse(p.findFile(tmpFile).content);
    p.deleteFile(tmpFile);
    const rugsName = "@atomist/rugs";
    const rugsVersion = pkgJsonObj.dependencies[rugsName];
    return p.fileContains(packageJson, `"@atomist/rugs": "${rugsVersion}",`);
});

Then("the package tmp file should not exist", (p: Project) => {
    return !p.fileExists(packageJson + ".tmp");
});

Then("the package file should still depend on mustache", (p: Project) => {
    return p.fileContains(packageJson, `"mustache": "^2.3.0"`);
});

Then("the package file should provide a test script", (p: Project) => {
    return p.fileContains(packageJson, `"test": "rug test"`);
});
