import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Project'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'

import { RugParameters } from './RugParameters'

@Editor("AddLocalEditor", "make an editor for modifying the local project, initiating a rug archive if needed")
@Tags("rug", "atomist", "typescript")
export class AddLocalEditor implements EditProject {

    @Parameter({
        ...RugParameters.Name,
        name: "Editor Name",
        description: "name for the new Rug editor"
    })
    editorName: string;

    @Parameter({
        ...RugParameters.Description,
        name: "Description",
        description: "description of the new Rug editor",
        required: false
    })
    description: string = "An editor for modifying this project";

    @Parameter(RugParameters.GroupId)
    groupId: string = "local";

    edit(project: Project) {
        project.editWith("ConvertExistingProjectToRugArchive", { description: this.description, archiveName: project.name(), groupId: this.groupId });
        project.editWith("AddTypeScript", {});
        if (!project.directoryExists(".atomist/node_modules")) {
            project.copyEditorBackingFilesPreservingPath(".atomist/node_modules");
        }

        project.editWith("AddTypeScriptEditor", this);
    }
}

export const addLocalEditor = new AddLocalEditor();
