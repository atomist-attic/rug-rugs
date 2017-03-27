import { PopulateProject } from '@atomist/rug/operations/ProjectGenerator';
import { Project } from '@atomist/rug/model/Project';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Generator, Parameter, Tags } from '@atomist/rug/operations/Decorators';

/**
 * Sample TypeScript generator used by AddTypeScriptGenerator.
 */
@Generator("TypeScriptGenerator", "sample TypeScript generator used by AddTypeScriptGenerator")
@Tags("documentation")
export class TypeScriptGenerator implements PopulateProject {

    @Parameter({
        displayName: "Some Input",
        description: "example of how to specify a parameter using decorators",
        pattern: Pattern.any,
        validInput: "a description of the valid input",
        minLength: 1,
        maxLength: 100,
        required: false
    })
    inputParameter: string = "input";

    populate(project: Project) {
        console.log(`Creating ${project.name()} with parameter ${this.inputParameter}`);
    }
}

export const typeScriptGenerator = new TypeScriptGenerator();
