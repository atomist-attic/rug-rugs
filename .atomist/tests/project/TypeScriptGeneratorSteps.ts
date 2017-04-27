import { Project } from "@atomist/rug/model/Project";
import { Given, ProjectScenarioWorld, Then, When } from "@atomist/rug/test/project/Core";

When("TypeScriptGenerator for TypeScriptGenerator should create a new project based on this archive", (p, world) => {
    const psworld = world as ProjectScenarioWorld;
    const generator = psworld.generator("TypeScriptGenerator");

    psworld.generateWith(generator, "new-test-project", {});
});

Then("fileExists README md for TypeScriptGenerator should create a new project based on this archive", (p, world) => {

    return p.fileExists("README.md");
});
