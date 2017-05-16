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

import { ResponseMessage } from "@atomist/rug/operations/Handlers";
import {
    CommandHandlerScenarioWorld, Given, Then, When,
} from "@atomist/rug/test/handler/Core";

Given("nothing", (f) => { return; });

When("the TypeScriptCommandHandler is invoked", (w: CommandHandlerScenarioWorld) => {
    const handler = w.commandHandler("TypeScriptCommandHandler");
    w.invokeHandler(handler, {});
});

Then("you get the right response", (w: CommandHandlerScenarioWorld) => {
    const expected = "Successfully ran TypeScriptCommandHandler: default value";
    const message = (w.plan().messages[0] as ResponseMessage).body;
    return message === expected;
});
