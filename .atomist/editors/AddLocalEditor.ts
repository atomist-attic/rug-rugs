import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Project'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Editor("AddLocalEditor", "make an editor for modifying the local project, initiating a rug archive if needed")
@Tags("documentation")
export class AddLocalEditor implements EditProject {

    @Parameter({
        displayName: "Some Input",
        description: "example of how to specify a parameter using decorators",
        pattern: Pattern.any,
        validInput: "a description of the valid input",
        minLength: 1,
        maxLength: 100
    })
    input_parameter: string;

    edit(project: Project) {
        project.addFile("hello.txt", "Hello, World!\n" + this.input_parameter + "\n");
    }
}

export const addLocalEditor = new AddLocalEditor();