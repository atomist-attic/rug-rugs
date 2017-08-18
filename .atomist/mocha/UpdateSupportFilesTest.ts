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

import "mocha";
import assert = require("power-assert");

import * as _ from "lodash";

import { updatePackageJson } from "../editors/UpdateSupportFiles";

describe("updatePackageJson", () => {

    /* tslint:disable:max-line-length */
    const updates = {
        scripts: {
            "autotest": "supervisor -q -n exit -e ts -x npm -- run mocha",
            "clean": "npm run clean-js ; rug clean",
            "clean-js": "find . -type d \\( -path ./node_modules -o -path ./target \\) -prune -o -type f -name '*.js' -print0 | xargs -0 rm -f",
            "compile": "tsc -p .",
            "distclean": "npm run clean ; rm -rf node_modules",
            "lint": "tslint '**/*.ts' --exclude 'node_modules/**' --exclude 'target/**' -t verbose",
            "lint-fix": "npm run lint -- --fix",
            "mocha": "mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'",
            "stage": "build/publish-to-team",
            "test": "npm run mocha && rug test",
        },
    };
    /* tslint:enable:max-line-length */

    it("should add scripts to package.json", () => {
        const updated = updatePackageJson(JSON.stringify(noScriptPkg), updates);
        const pkg = JSON.parse(updated);
        _.forEach(updates, (v, k) => {
            assert.deepEqual(pkg[k], updates[k]);
        });
    });

    it("should update scripts in simple package.json", () => {
        const updated = updatePackageJson(JSON.stringify(simplePkg), updates);
        const pkg = JSON.parse(updated);
        _.forEach(updates, (v, k) => {
            assert.deepEqual(pkg[k], updates[k]);
        });
    });

    it("should update scripts in full package.json", () => {
        const updated = updatePackageJson(JSON.stringify(fullPkg), updates);
        const pkg = JSON.parse(updated);
        _.forEach(updates, (v, k) => {
            assert.deepEqual(pkg[k], updates[k]);
        });
    });

    it("should do nothing if package.json up to date", () => {
        const updated = updatePackageJson(completePkgJson, updates);
        const pkg = JSON.parse(updated);
        assert.deepEqual(pkg, JSON.parse(completePkgJson));
        assert(updated === completePkgJson);
    });

    it("should update multiple elements", () => {
        const multipleUpdates = {
            directories: {
                test: "mocha",
            },
            ...updates,
        };
        const updated = updatePackageJson(JSON.stringify(simplePkg), multipleUpdates);
        const pkg = JSON.parse(updated);
        _.forEach(multipleUpdates, (v, k) => {
            assert.deepEqual(pkg[k], multipleUpdates[k]);
        });
    });

});

/* tslint:disable:max-line-length */
const noScriptPkg = {
    name: "@atomist/rug-rugs",
    description: "Atomist Rugs for working with Rugs",
    version: "0.32.2",
    author: "Atomist",
    license: "Apache-2.0",
    atomist: {
        requires: "[1.0.0-m.5,2.0.0)",
    },
};

const simplePkg = {
    name: "@atomist/rug-rugs",
    description: "Atomist Rugs for working with Rugs",
    version: "0.32.2",
    author: "Atomist",
    license: "Apache-2.0",
    scripts: {
        "autotest": "supervisor -q -n exit -e ts -x npm -- run mocha",
        "clean": "npm run clean-js ; rug clean",
        "clean-js": "find . -type d \\( -path ./node_modules -o -path ./target \\) -prune -o -type f -name '*.js' -print0 | xargs -0 rm -f",
        "compile": "tsc -p .",
        "lint": "tslint '**/*.ts' --exclude 'node_modules/**' --exclude 'target/**' -t verbose",
        "mocha": "mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'",
        "test": "npm run mocha && rug test",
    },
};

const fullPkg = {
    name: "@atomist/rug-rugs",
    description: "Atomist Rugs for working with Rugs",
    version: "0.32.2",
    author: "Atomist",
    license: "Apache-2.0",
    repository: {
        type: "git",
        url: "https://github.com/atomist/rug-rugs.git",
    },
    keywords: [
        "atomist",
        "rug",
    ],
    homepage: "https://github.com/atomist/rug-rugs#readme",
    bugs: {
        url: "https://github.com/atomist/rug-rugs/issues",
    },
    dependencies: {
        "@atomist/cortex": "^1.0.0-m.5",
        "@atomist/rug": "^1.0.0-m.5",
        "@atomist/rugs": "^1.0.0-m.6",
        "deprecated-decorator": "0.1.6",
        "js-yaml": "^3.8.4",
    },
    devDependencies: {
        "@types/js-yaml": "^3.5.31",
        "@types/mocha": "^2.2.41",
        "@types/power-assert": "^1.4.29",
        "espower-typescript": "^8.0.0",
        "mocha": "^3.4.2",
        "power-assert": "^1.4.4",
        "supervisor": "^0.12.0",
        "tslint": "^5.4.3",
        "typescript": "^2.3.4",
    },
    directories: {
        test: "mocha",
    },
    scripts: {
        "autotest": "supervisor -q -n exit -e ts -x npm -- run mocha",
        "clean": "npm run clean-js ; rug clean",
        "stage": "build/publish-to-team",
        "clean-js": "find . -type d \\( -path ./node_modules -o -path ./target \\) -prune -o -type f -name '*.js' -print0 | xargs -0 rm -f",
        "compile": "tsc -p .",
        "distclean": "npm run clean ; rm -rf node_modules",
        "lint": "tslint '**/*.ts' --exclude 'node_modules/**' --exclude 'target/**' -t verbose",
        "lint-fix": "npm run lint -- --fix",
        "mocha": "mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'",
        "test": "npm run mocha && rug test",
    },
    atomist: {
        requires: "[1.0.0-m.5,2.0.0)",
        extensions: {
            "com.atomist.rug:rug-function-http": "[0.7.3,1.0.0)",
        },
        excludes: {
            "editors": [
                "TypeScriptEditor",
            ],
            "generators": [
                "TypeScriptGenerator",
            ],
            "command-handlers": [
                "TypeScriptCommandHandler",
            ],
            "event-handlers": [
                "TypeScriptEventHandler",
            ],
        },
    },
};

const completePkgJson = `{
  "name": "@atomist/rug-rugs",
  "description": "Atomist Rugs for working with Rugs",
  "version": "0.32.2",
  "author": "Atomist",
  "license": "Apache-2.0",
  "repository": {
    "type": "git",
    "url": "https://github.com/atomist/rug-rugs.git"
  },
  "keywords": [
    "atomist",
    "rug"
  ],
  "homepage": "https://github.com/atomist/rug-rugs#readme",
  "bugs": {
    "url": "https://github.com/atomist/rug-rugs/issues"
  },
  "dependencies": {
    "@atomist/cortex": "^1.0.0-m.5",
    "@atomist/rug": "^1.0.0-m.6",
    "@atomist/rugs": "^1.0.0-m.6",
    "deprecated-decorator": "0.1.6",
    "js-yaml": "^3.8.4",
    "lodash": "^4.17.4"
  },
  "devDependencies": {
    "@types/js-yaml": "^3.5.31",
    "@types/mocha": "^2.2.41",
    "@types/power-assert": "^1.4.29",
    "espower-typescript": "^8.0.0",
    "mocha": "^3.4.2",
    "power-assert": "^1.4.4",
    "supervisor": "^0.12.0",
    "tslint": "^5.4.3",
    "typescript": "^2.3.4"
  },
  "directories": {
    "test": "mocha"
  },
  "scripts": {
    "autotest": "supervisor -q -n exit -e ts -x npm -- run mocha",
    "clean": "npm run clean-js ; rug clean",
    "stage": "build/publish-to-team",
    "clean-js": "find . -type d \\\\( -path ./node_modules -o -path ./target \\\\) -prune -o -type f -name '*.js' -print0 | xargs -0 rm -f",
    "compile": "tsc -p .",
    "distclean": "npm run clean ; rm -rf node_modules",
    "lint": "tslint '**/*.ts' --exclude 'node_modules/**' --exclude 'target/**' -t verbose",
    "lint-fix": "npm run lint -- --fix",
    "mocha": "mocha --compilers ts:espower-typescript/guess 'mocha/**/*.ts'",
    "test": "npm run mocha && rug test"
  },
  "atomist": {
    "requires": "[1.0.0-m.6,2.0.0)",
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
`;
