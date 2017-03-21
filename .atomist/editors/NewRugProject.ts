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
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'
import { File } from '@atomist/rug/model/File'

import { removeUnnecessaryFiles, cleanReadMe } from './RugGeneratorFunctions'

@Generator("NewRugProject", "Generate new Rug archive project")
@Tags("rug", "atomist")
export class NewRugProject implements PopulateProject {

    @Parameter({
        displayName: "Group ID",
        description: "Maven group identifier, often used to provide a namespace for your rugs, e.g., company-rugs, typically the GitHub owner",
        pattern: Pattern.group_id,
        validInput: "a valid Maven group ID, which starts with a letter, -, or _ and contains only alphanumeric, -, and _ characters and may having leading period separated identifiers starting with letters or underscores and containing only alphanumeric and _ characters",
        minLength: 1,
        maxLength: 100
    })
    owner: string;

    @Parameter({
        displayName: "Project Description",
        description: "short descriptive text describing the new project",
        pattern: Pattern.any,
        validInput: "free text",
        minLength: 1,
        maxLength: 100
    })
    description: string;

    @Parameter({
        displayName: "Version",
        description: "initial version of the project, e.g., 1.2.3",
        pattern: Pattern.semantic_version,
        validInput: "a valid semantic version, http://semver.org",
        minLength: 5,
        maxLength: 100,
        required: false
    })
    version: string = "0.1.0";

    populate(project: Project) {
        let toRemove: string[] = [
            "CHANGELOG.md",
            "CODE_OF_CONDUCT.md",
            "LICENSE"
        ];
        removeUnnecessaryFiles(project, toRemove);

        cleanReadMe(project, this.description, this.owner);

        let params = {
            archiveName: project.name(),
            groupId: this.owner,
            version: this.version
        }
        project.editWith("AddManifestYml", params);
    }
}

export const newRugProject = new NewRugProject();
