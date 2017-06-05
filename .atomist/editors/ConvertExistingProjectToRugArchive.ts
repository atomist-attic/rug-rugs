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

import { Project } from "@atomist/rug/model/Project";
import { Editor, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { EditProject } from "@atomist/rug/operations/ProjectEditor";
import { Pattern } from "@atomist/rug/operations/RugOperation";

import { customizePackageJson, formatPackageJson, packageJsonPath } from "./ConvertManifestToPackageJson";
import { AlreadyRugArchiveError, isRugArchive } from "./RugEditorsPredicates";
import { RugParameters } from "./RugParameters";
import { updateRugFiles } from "./UpdateSupportFiles";

/**
 * Convert an existing project into a Rug archive project.  If the project
 * appears to already be a Rug archive project, an error is thrown.
 */
@Editor("ConvertExistingProjectToRugArchive", "converts an existing project to a Rug archive project")
@Tags("rug", "atomist")
export class ConvertExistingProjectToRugArchive implements EditProject {

    @Parameter({
        displayName: "Rug Archive Name",
        description: "name of your new Rug Archive, typically the same as the repo name",
        pattern: Pattern.project_name,
        validInput: "a valid GitHub repo name containing only alphanumeric, ., -, and _ characters",
        minLength: 1,
        maxLength: 100,
    })
    public archiveName: string;

    @Parameter(RugParameters.GroupId)
    public groupId: string;

    @Parameter({
        displayName: "Rug Archive Version",
        description: "initial version of the project, e.g., 1.2.3",
        pattern: Pattern.semantic_version,
        validInput: "a valid semantic version, http://semver.org",
        minLength: 1,
        maxLength: 100,
        required: false,
    })
    public version: string = "0.1.0";

    public edit(project: Project) {
        if (isRugArchive(project)) {
            throw new AlreadyRugArchiveError();
        }
        populateAtomistDirectory(project, this.archiveName, this.groupId, this.version);
    }
}

export const convertExistingProjectToRugArchive = new ConvertExistingProjectToRugArchive();

/**
 * Create and populate the .atomist directory based on the contents of
 * this project.
 */
export function populateAtomistDirectory(project: Project, name: string, group: string, version: string) {
    const packageJson = customizePackageJson(project, name, group, version, true);
    const packageJsonContent = formatPackageJson(packageJson);
    const packageJsonFile = project.findFile(packageJsonPath);
    if (!packageJsonFile) {
        throw new Error(`${packageJsonPath} has disappeared`);
    }
    packageJsonFile.setContent(packageJsonContent);
    updateRugFiles(project);
    // mocha fails with no tests, so add one that always passes
    project.copyEditorBackingFileOrFail(".atomist/mocha/SimpleTest.ts");
}
