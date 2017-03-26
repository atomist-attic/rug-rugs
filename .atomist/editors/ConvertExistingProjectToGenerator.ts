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
import { Pattern } from '@atomist/rug/operations/RugOperation';
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators';

@Editor("ConvertExistingProjectToGenerator", "converts and existing project to a Rug archive project with a basic Generator")
@Tags("rug", "atomist")
export class ConvertExistingProjectToGenerator implements EditProject {

    @Parameter({
        displayName: "Rug Archive Name",
        description: "name of your new Rug Archive, typically the same as the repo name",
        pattern: Pattern.project_name,
        validInput: "a valid GitHub repo name containing only alphanumeric, ., -, and _ characters",
        minLength: 1,
        maxLength: 100
    })
    archiveName: string;

    @Parameter({
        displayName: "Rug Archive Group ID",
        description: "Maven group identifier, often used to provide a namespace for your rugs, e.g., company-rugs, typically the GitHub owner",
        pattern: Pattern.group_id,
        validInput: "a valid Maven group ID, which starts with a letter, -, or _ and contains only alphanumeric, -, and _ characters and may having leading period separated identifiers starting with letters or underscores and containing only alphanumeric and _ characters",
        minLength: 1,
        maxLength: 100
    })
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

    @Parameter({
        displayName: "Generator Name",
        description: "name of generator to add to Rug archive project",
        pattern: "^[A-Z][A-Za-z0-9]*$",
        validInput: "a valid generator name starting with a capital letter and consisting of alphanumeric characters from one to 100 characters long",
        minLength: 1,
        maxLength: 100
    })
    generatorName: string;

    @Parameter({
        displayName: "Generator Description",
        description: "description of generator to add to Rug archive project",
        pattern: Pattern.any,
        validInput: "a string between one and 100 characters",
        minLength: 1,
        maxLength: 100
    })
    description: string;

    edit(project: Project) {
        if (project.fileExists(".atomist/manifest.yml")) {
            return;
        }
        project.editWith("ConvertExistingProjectToRugArchive", this);
        project.editWith("AddTypeScript", {});
        project.editWith("AddTypeScriptGenerator", this);
    }
}

export const convertExistingProjectToGenerator = new ConvertExistingProjectToGenerator();
