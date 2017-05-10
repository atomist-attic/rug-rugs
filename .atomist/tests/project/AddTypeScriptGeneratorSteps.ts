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

const generatorName = "MyNewGenerator";
const description = `description of ${generatorName}`;

When("AddTypeScriptGenerator is run", (p: Project, w: ProjectScenarioWorld) => {
    const editor = w.editor("AddTypeScriptGenerator");
    w.editWith(editor, { generatorName, description });
});

Then("file at ([^\\s]+) should not contain (.*)",
    (p: Project, w: ProjectScenarioWorld, path: string, match: string) => {
        return !p.fileContains(path, match);
    },
);

Then("file at ([^\\s]+) should not exist", (p: Project, w: ProjectScenarioWorld, path: string) => {
    return !p.fileExists(path);
});

When("AddTypeScriptGenerator is run without generator name", (p: Project, w: ProjectScenarioWorld) => {
    const editor = w.editor("AddTypeScriptGenerator");
    w.editWith(editor, { description: "Something wicked this way comes" });
});
