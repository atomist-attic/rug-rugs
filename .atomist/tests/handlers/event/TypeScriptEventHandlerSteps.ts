import { DirectedMessage } from "@atomist/rug/operations/Handlers";
import { EventHandlerScenarioWorld, Given, HandlerScenarioWorld, Then, When } from "@atomist/rug/test/handler/Core";

import { Tag } from "@atomist/cortex/stub/Tag";

Given("the TypeScriptEventHandler is registered", (world: HandlerScenarioWorld) => {
    const w: EventHandlerScenarioWorld = world as EventHandlerScenarioWorld;
    w.registerHandler("TypeScriptEventHandler");
});

When("a new Tag is received", (world: HandlerScenarioWorld) => {
    const w: EventHandlerScenarioWorld = world as EventHandlerScenarioWorld;
    const event = new Tag();
    w.sendEvent(event);
});

Then("the TypeScriptEventHandler event handler should respond with the correct message", (w: HandlerScenarioWorld) => {
    const expected = `Tag event received`;
    const message = (w.plan().messages[0] as DirectedMessage).body;
    return message === expected;
});
