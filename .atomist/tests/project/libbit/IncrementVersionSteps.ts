import { Project } from "@atomist/rug/model/Project";
import {
    Given, ProjectScenarioWorld, Then, When,
} from "@atomist/rug/test/project/Core";

const sourceFiles = [".atomist/editors/libbits/IncrementVersion.ts"];
const testFiles = [".atomist/mocha/IncrementVersionTest.ts"];

When("the IncrementVersionLibbit is run", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("IncrementVersionLibbit");
    w.editWith(editor, {});
});

Then("the new IncrementVersion source file exists", (p: Project, world) => {
    return sourceFiles.every((f) => p.fileExists(f));
});

Then("the new IncrementVersion test files exist", (p: Project, world) => {
    return testFiles.every((f) => p.fileExists(f));
});

Given("the new IncrementVersion source file already exists", (p: Project) => {
    p.addFile(sourceFiles[0], "stuff");
});
