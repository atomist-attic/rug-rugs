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

const manifestYmlName = ".atomist/manifest.yml";
const maniestYmlContents = `group: atomist
artifact: rug-rugs
version: "0.31.0"
requires: "1.0.0-m.3"
dependencies:
extensions:
- "com.atomist.rug:rug-function-http:[0.7.3,1.0.0)"
excludes:
  editors:
    - TypeScriptEditor
  generators:
    - TypeScriptGenerator
  command_handlers:
    - TypeScriptCommandHandler
  event_handlers:
    - TypeScriptEventHandler
`;

const packageJsonName = ".atomist/package.json";
const packageJsonContent = `{
  "dependencies": {
    "@atomist/rugs": "^1.0.0-m.4",
    "deprecated-decorator": "0.1.6",
    "js-yaml": "^3.8.4"
  },
  "devDependencies": {
    "@types/mocha": "^2.2.40",
    "@types/power-assert": "^1.4.29",
    "@types/js-yaml": "^3.5.30",
    "espower-typescript": "^8.0.0",
    "mocha": "^3.2.0",
    "power-assert": "^1.4.2",
    "tslint": "^5.0.0",
    "typescript": "2.3.2",
    "yarn": "^0.23.4"
  },
  "directories": {
    "test": "mocha"
  },
  "scripts": {
    "lint": "tslint '**/*.ts' --exclude 'node_modules/**' -t verbose",
    "mocha": "mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'",
    "test": "yarn run mocha && rug test"
  }
}
`;

Given("a manifest.yml and package.json", (p: Project) => {
    p.addFile(manifestYmlName, maniestYmlContents);
    p.addFile(packageJsonName, packageJsonContent);
});

Given("a manifest.yml", (p: Project) => {
    p.addFile(manifestYmlName, maniestYmlContents);
});

When("the ConvertManifestToPackageJson is run", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("ConvertManifestToPackageJson");
    w.editWith(editor, {});
});

Then("the package.json has previous entries", (p: Project, w) => {
    const packageJson = JSON.parse(p.findFile(packageJsonName).content);

    return packageJson.dependencies != null
        && packageJson.devDependencies != null
        && packageJson.directories != null
        && packageJson.scripts != null;
});

Then("the manifest.yml got merged into package.json", (p: Project, w) => {
    const packageJson = JSON.parse(p.findFile(packageJsonName).content);
    const atomist = packageJson.atomist;
    return packageJson.name === "@atomist/rug-rugs"
        && packageJson.version === "0.31.0"
        && atomist.requires === "1.0.0-m.3"
        && atomist.extensions["com.atomist.rug:rug-function-http"] === "[0.7.3,1.0.0)"
        && atomist.excludes.editors.length === 1
        && atomist.excludes["command-handlers"][0] === "TypeScriptCommandHandler";
});

Then("the manifest.yml got deleted", (p: Project, w: ProjectScenarioWorld, path: string) => {
    return !p.fileExists(manifestYmlName);
});
