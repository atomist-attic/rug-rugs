/*
 * Copyright © 2017 Atomist, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { PopulateProject } from '@atomist/rug/operations/ProjectGenerator'
import { Project } from '@atomist/rug/model/Project'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Generator, Parameter, Tags } from '@atomist/rug/operations/Decorators'

import { removeUnnecessaryFiles, cleanReadMe, cleanChangeLog } from './RugGeneratorFunctions'

@Generator("NewStarterRugProject", "create new Rug archive project using standard setup and sensible defaults")
@Tags("atomist", "rug", "starter")
export class NewStarterRugProject implements PopulateProject {

    populate(project: Project) {
        removeUnnecessaryFiles(project);

        const description: string = "Atomist Rug archive project.";
        const owner: string = "atomist-rugs";

        let toRemove: string[] = [
            "CODE_OF_CONDUCT.md"
        ];
        removeUnnecessaryFiles(project, toRemove);
        cleanReadMe(project, description, owner);
        cleanChangeLog(project, owner);

        const version: string = "0.1.0";
        const manifestParams = {
            archiveName: project.name(),
            groupId: owner,
            version: version
        }
        project.editWith("AddManifestYml", manifestParams);
        project.editWith("AddTypeScript", {});
        project.copyEditorBackingFilesPreservingPath(".atomist/node_modules");
        const editorParams = {
            editorName: "MyFirstEditor",
            description: "A sample Rug TypeScript editor to start playing with."
        }
        project.editWith("AddTypeScriptEditor", editorParams);
    }
}

export const newStarterRugProject = new NewStarterRugProject();
