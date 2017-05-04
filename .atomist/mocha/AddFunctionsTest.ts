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

import { readMeInstructions } from "../editors/AddFunctions";

describe("readMeInstructions", () => {

    it("should generate instructions properly", () => {
        const name = "SomeSong";
        const description = "yeah it's halloween tonight and every night";
        const example = "help me kill my time";
        const exampleText = "cuz I'll never be fine";
        const prereqs = "in the jail and the army and the hospital too";
        const params = ["symphonyMan | Yes | 1 | notes"];

        const instructions = readMeInstructions(name, description, example, exampleText, prereqs, params);

        assert(instructions.indexOf(`### ${name}`) >= 0);
        assert(instructions.indexOf(description) >= 0);
        assert(instructions.indexOf(example) >= 0);
        assert(instructions.indexOf(exampleText) >= 0);
        assert(instructions.indexOf(prereqs) >= 0);
        assert(instructions.indexOf(params[0]) >= 0);
    });

});
