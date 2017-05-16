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
import {
    Given, ProjectScenarioWorld, Then, When,
} from "@atomist/rug/test/project/Core";

When("the TypeScriptEditor is run", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("TypeScriptEditor");
    w.editWith(editor, { inputParameter: "the inputParameter value" });
});

Then("the hello file says hello", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    return p.fileContains("hello.txt", "Hello, World!");
});
