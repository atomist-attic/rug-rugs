import { Project } from "@atomist/rug/model/Project";
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

When("HavePathExpressionEngine rugNameisTypeScriptEditor for HavePathExpressionEngine puts a path expression in the typescript", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("HavePathExpressionEngine");
    let target=".atomist/editors/TypeScriptEditor.ts";
    psworld.editWith(editor, { rugName: "TypeScriptEditor", target: ".atomist/editors/TypeScriptEditor.ts" });
});

Then("fileContains target let eng PathExpressionEngine project context pathExpressionEngine for HavePathExpressionEngine puts a path expression in the typescript", (p, world) => {
    let target=".atomist/editors/TypeScriptEditor.ts";
    return p.fileContains(target, "let eng: PathExpressionEngine = project.context().pathExpressionEngine();");
});

Then("fileContains target import PathExpression PathExpressionEngine from atomist rug tree PathExpression for HavePathExpressionEngine puts a path expression in the typescript", (p, world) => {
    let target=".atomist/editors/TypeScriptEditor.ts";
    return p.fileContains(target, "import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression");
});

