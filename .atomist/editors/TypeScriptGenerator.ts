import { PopulateProject } from '@atomist/rug/operations/ProjectGenerator'
import { Project } from '@atomist/rug/model/Project'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Generator, Parameter, Tags } from '@atomist/rug/operations/Decorators'

@Generator("TypeScriptGenerator", "sample TypeScript generator used by AddTypeScriptGenerator")
@Tags("documentation")
class TypeScriptGenerator implements PopulateProject {

    populate(project: Project) {
        console.log(`Creating ${project.name()}`);
    }
}

export const typeScriptGenerator = new TypeScriptGenerator();
