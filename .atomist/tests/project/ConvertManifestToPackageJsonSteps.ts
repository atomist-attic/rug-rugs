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

import { packageJsonPath } from "../../editors/ConvertManifestToPackageJson";

const manifestYmlPath = ".atomist/manifest.yml";
const maniestYmlContents = `group: presley
artifact: graceland-rugs
version: "1935.1.8"
requires: "1977.8.16"
dependencies:
extensions:
- "com.atomist.rug:under-african-skies:3.3.7"
excludes:
  editors:
    - BoyInTheBubble
  generators:
    - IKnowWhatIKnow
  command_handlers:
    - Gumboots
  event_handlers:
    - YouCanCallMeAl
`;

const packageJsonContent = `{
  "dependencies": {
    "@atomist/rugs": "^1.0.0-m.4"
  },
  "devDependencies": {
    "@types/mocha": "^2.2.40",
    "@types/power-assert": "^1.4.29",
    "espower-typescript": "^8.0.0",
    "mocha": "^3.2.0",
    "power-assert": "^1.4.2",
    "tslint": "^5.0.0",
    "typescript": "2.3.2"
  },
  "directories": {
    "test": "mocha"
  },
  "scripts": {
    "lint": "tslint '**/*.ts' --exclude 'node_modules/**' -t verbose",
    "mocha": "mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'",
    "test": "npm run mocha && rug test"
  }
}
`;

const packageJsonWithDescriptionContent = `{
  "author": "Paul Simon",
  "description": "we are going to Graceland",
  "dependencies": {
    "@atomist/rugs": "^1.0.0-m.4"
  },
  "devDependencies": {
    "@types/mocha": "^2.2.40",
    "@types/power-assert": "^1.4.29",
    "espower-typescript": "^8.0.0",
    "mocha": "^3.2.0",
    "power-assert": "^1.4.2",
    "tslint": "^5.0.0",
    "typescript": "2.3.2"
  },
  "directories": {
    "test": "mocha"
  },
  "homepage": "http://www.graceland.com",
  "scripts": {
    "lint": "tslint '**/*.ts' --exclude 'node_modules/**' -t verbose",
    "mocha": "mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'",
    "test": "npm run mocha && rug test"
  }
}
`;

Given("a manifest.yml", (p: Project) => {
    p.addFile(manifestYmlPath, maniestYmlContents);
});

Given("a package.json", (p: Project) => {
    p.addFile(packageJsonPath, packageJsonContent);
});

Given("a package.json with description", (p: Project) => {
    p.addFile(packageJsonPath, packageJsonWithDescriptionContent);
});

When("the ConvertManifestToPackageJson is run", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("ConvertManifestToPackageJson");
    w.editWith(editor, {});
});

Then("the package.json has previous entries", (p: Project, w) => {
    const packageJson = JSON.parse(p.findFile(packageJsonPath).content);
    return packageJson.dependencies != null
        && packageJson.devDependencies != null
        && packageJson.directories != null
        && packageJson.scripts != null;
});

Then("the manifest.yml got merged into package.json", (p: Project, w) => {
    const slug = "presley/graceland-rugs";
    return checkPkgJson(p, "presley", `Atomist Rugs from ${slug}`,
        `https://github.com/${slug}#readme`);
});

Then("the manifest.yml got merged into original package.json", (p: Project, w) => {
    return checkPkgJson(p, "Paul Simon", "we are going to Graceland",
        "http://www.graceland.com");
});

function checkPkgJson(p: Project, author: string, description: string, homepage: string): boolean {
    const packageJson = JSON.parse(p.findFile(packageJsonPath).content);
    const atomist = packageJson.atomist;
    const slug = "presley/graceland-rugs";
    return packageJson.name === `@${slug}`
        && packageJson.description === description
        && packageJson.version === "1935.1.8"
        && packageJson.author === author
        && packageJson.repository.url === `https://github.com/${slug}.git`
        && packageJson.homepage === homepage
        && packageJson.bugs.url === `https://github.com/${slug}/issues`
        && atomist.requires === "1977.8.16"
        && atomist.extensions["com.atomist.rug:under-african-skies"] === "3.3.7"
        && atomist.excludes.editors.length === 1
        && atomist.excludes["command-handlers"][0] === "Gumboots";
}
