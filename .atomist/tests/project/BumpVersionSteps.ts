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

Given("a Rug archive manifest with version (.*)", (p: Project, w: ProjectScenarioWorld, version: string) => {
    p.addFile(".atomist/manifest.yml", `group: test-rugs
artifact: test-manifest
version: ${version}
requires: "[1.0.0-m.3,2.0.0)"
`);
});

Given("a Rug archive package.json with version (.*)", (p: Project, w: ProjectScenarioWorld, version: string) => {
    p.addFile(".atomist/package.json", `{
  "name": "@atomist/bump-rugs",
  "description": "Atomist Rugs for bump version testing",
  "version": "${version}",
  "author": "Atomist",
  "license": "Apache-2.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/atomist/rug-rugs.git"
  },
  "keywords": [
    "Atomist",
    "Rug"
  ],
  "homepage": "https://github.com/atomist/rug-rugs#readme",
  "bugs": {
    "url": "https://github.com/atomist/rug-rugs/issues"
  },
  "dependencies": {
    "@atomist/rugs": "^1.0.0-m.5",
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
    "supervisor": "^0.12.0",
    "tslint": "^5.0.0",
    "typescript": "2.3.2"
  },
  "directories": {
    "test": "mocha"
  },
  "scripts": {
    "autotest": "supervisor -q -n exit -e ts -x yarn -- run mocha",
    "lint": "tslint '**/*.ts' --exclude 'node_modules/**' -t verbose",
    "mocha": "mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'",
    "test": "yarn run mocha && rug test"
  },
  "atomist": {
    "requires": "[1.0.0-m.4,2.0.0)",
    "extensions": {
      "com.atomist.rug:rug-function-http": "[0.7.3,1.0.0)"
    },
    "excludes": {
      "editors": [
        "TypeScriptEditor"
      ],
      "generators": [
        "TypeScriptGenerator"
      ],
      "command-handlers": [
        "TypeScriptCommandHandler"
      ],
      "event-handlers": [
        "TypeScriptEventHandler"
      ]
    }
  }
}
`);
});

When("BumpVersion bumps the (major|minor|patch) version", (p: Project, w: ProjectScenarioWorld, component: string) => {
    const editor = w.editor("BumpVersion");
    w.editWith(editor, { component });
});

Then("the manifest was deleted", (p: Project, w: ProjectScenarioWorld, component: string) => {
    return !p.fileExists(".atomist/manifest.yml");
});
