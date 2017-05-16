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

import { DirectedMessage } from "@atomist/rug/operations/Handlers";
import {
    EventHandlerScenarioWorld, Given, Then, When,
} from "@atomist/rug/test/handler/Core";

import { Tag } from "@atomist/cortex/stub/Tag";

Given("the TypeScriptEventHandler is registered", (w: EventHandlerScenarioWorld) => {
    w.registerHandler("TypeScriptEventHandler");
});

When("a new Tag is received", (w: EventHandlerScenarioWorld) => {
    const event = new Tag();
    w.sendEvent(event);
});

Then("the TypeScriptEventHandler event handler should respond with the correct message",
    (w: EventHandlerScenarioWorld) => {
        const expected = `Tag event received`;
        const message = (w.plan().messages[0] as DirectedMessage).body;
        return message === expected;
    },
);
