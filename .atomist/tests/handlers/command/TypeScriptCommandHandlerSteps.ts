import { ResponseMessage } from "@atomist/rug/operations/Handlers";
import { CommandHandlerScenarioWorld, Given, HandlerScenarioWorld, Then, When } from "@atomist/rug/test/handler/Core";

Given("nothing", (f) => { return; });

When("the TypeScriptCommandHandler is invoked", (world: HandlerScenarioWorld) => {
    const w: CommandHandlerScenarioWorld = world as CommandHandlerScenarioWorld;
    const handler = w.commandHandler("TypeScriptCommandHandler");
    w.invokeHandler(handler, {});
});

Then("you get the right response", (world: HandlerScenarioWorld) => {
    const w: CommandHandlerScenarioWorld = world as CommandHandlerScenarioWorld;
    const expected = "Successfully ran TypeScriptCommandHandler: default value";
    const message = (w.plan().messages[0] as ResponseMessage).body;
    return message === expected;
});
