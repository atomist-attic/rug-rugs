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

import { EditProject } from '@atomist/rug/operations/ProjectEditor';
import { Project } from '@atomist/rug/model/Project';
import { File } from '@atomist/rug/model/File';
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';

import { IsRugArchive } from './RugEditorsPredicates';
import { RugParameters } from './RugParameters';

@Editor("AddManifestYml", "adds a Rug archive manifest")
@Tags("rug", "atomist")
export class AddManifestYml implements EditProject {

    @Parameter({
        displayName: "Rug Archive Name",
        description: "name of your new Rug Archive, typically the same as the repo name",
        pattern: Pattern.project_name,
        validInput: "a valid GitHub repo name containing only alphanumeric, ., -, and _ characters",
        minLength: 1,
        maxLength: 100
    })
    archiveName: string;

    @Parameter(RugParameters.GroupId)
    groupId: string;

    @Parameter({
        displayName: "Rug Archive Version",
        description: "initial version of the project, e.g., 1.2.3",
        pattern: Pattern.semantic_version,
        validInput: "a valid semantic version, http://semver.org",
        minLength: 1,
        maxLength: 100,
        required: false,
    })
    version: string = "0.1.0";

    edit(project: Project) {
        if (IsRugArchive(project)) {
            return;
        }

        const manifestPath = ".atomist/manifest.yml";
        project.copyEditorBackingFileOrFail(manifestPath);

        let manifest: File = project.findFile(".atomist/manifest.yml");
        let lines: string[] = manifest.content.split("\n");
        let newLines: string[] = [
            `group: "${this.groupId}"`,
            `artifact: "${this.archiveName}"`,
            `version: "${this.version}"`
        ];
        for (let l of lines) {
            if (/^requires:/.test(l)) {
                newLines.push(l);
            }
        }
        manifest.setContent(newLines.join("\n"));
    }
}

export const addManifestYml = new AddManifestYml();
