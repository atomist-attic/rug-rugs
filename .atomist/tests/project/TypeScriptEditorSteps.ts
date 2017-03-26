import { Project } from "@atomist/rug/model/Project";
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

When("TypeScriptEditor inputParameteristhe inputParameter value for TypeScriptEditor is added to your project by AddTypeScriptEditor", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("TypeScriptEditor");

    psworld.editWith(editor, { inputParameter: "the inputParameter value" });
});

Then("fileContains hello txt Hello Worldnot for TypeScriptEditor is added to your project by AddTypeScriptEditor", (p, world) => {

    return p.fileContains("hello.txt", "Hello, World!");
});
