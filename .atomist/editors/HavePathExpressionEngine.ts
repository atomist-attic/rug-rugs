import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Project'
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { File } from '@atomist/rug/model/File'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Editor("HavePathExpressionEngine", "get access to a path expression engine in a Rug editor")
@Tags("documentation")
class HavePathExpressionEngine implements EditProject {

    @Parameter({
        displayName: "Rug to modify",
        description: "name of a TypeScript rug",
        pattern: Pattern.any,
        validInput: "an existing TypeScript rug in your repository",
        minLength: 1,
        maxLength: 100
    })
    rug_name: string;

    edit(project: Project) {
        let eng: PathExpressionEngine = project.context().pathExpressionEngine();

        eng.with<File>(project, `/*[@name=".atomist"]/editors/*[@name='${this.rug_name}.ts']`, rug => {
            console.log(`Found file ${rug.path()}`)
            if (!rug.contains("project.context().pathExpressionEngine()")) {
                // microgrammars would look better. Need rug 0.13
                rug.regexpReplace("(edit\\(.*\\) \\{)", "$1\n        let eng: PathExpressionEngine = project.context().pathExpressionEngine();\n");
            }
            if (!rug.contains("import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'")) {
                // if we had a TypeScript language extension, "add import" would be a thing
                rug.prepend("import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'\n");
            }

        });
    }
}

export const havePathExpressionEngine = new HavePathExpressionEngine();
