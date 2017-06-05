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

const params = {
    handlerName: "PattiSmith",
    description: "debut album released in 1975",
};

When("AddTypeScriptEventHandler is run with default path expression", (p: Project, w: ProjectScenarioWorld) => {
    const editor = w.editor("AddTypeScriptEventHandler");
    w.editWith(editor, params);
});

const pathExpression = "/Horses()/track2::RedondoBeach()";
const newRootNode = "Horses";

When("AddTypeScriptEventHandler is run providing a path expression", (p: Project, w: ProjectScenarioWorld) => {
    const editor = w.editor("AddTypeScriptEventHandler");
    w.editWith(editor, { ...params, pathExpression });
});
