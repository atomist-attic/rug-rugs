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

import { File } from "@atomist/rug/model/File";
import { Project } from "@atomist/rug/model/Project";
import { PathExpression, PathExpressionEngine } from "@atomist/rug/tree/PathExpression";

import { populateAtomistDirectory } from "../editors/ConvertExistingProjectToRugArchive";

/**
 * Curate the contents of a Rug archive project based on this project.
 *
 * @param project      project to curate
 * @param owner        owner, typically GitHub org, of Rug project
 * @param description  sentence fragment describing Rug project
 * @param version      initial version of Rug project
 * @param toRemove     files to remove beyond the standard files
 */
export function generateRugProject(
    project: Project,
    owner: string,
    description: string,
    version: string,
    toRemove: string[]) {

    removeUnnecessaryFiles(project, toRemove);
    cleanReadMe(project, description, owner);
    populateAtomistDirectory(project, project.name, owner, version);
}

/**
 * Remove files in this project that do not belong in the generated
 * project.
 *
 * @param project  Generated project to be modified.
 * @param extra    List of files in addition to the defaults to remove.
 */
export function removeUnnecessaryFiles(project: Project, extra?: string[]): void {
    let toRemove: string[] = [
        ".atomist.yml",
        ".travis.yml",
    ];
    if (extra != null) {
        toRemove = toRemove.concat(extra);
    }
    for (const f of toRemove) {
        project.deleteFile(f);
    }
}

/**
 * Replace project name, description, and GitHub owner in README.
 *
 * @param project      Project whose README is to be modified.
 * @param description  Description of generated project.
 * @param owner        GitHub owner (user or org) of project.
 */
export function cleanReadMe(project: Project, description: string, owner: string): void {
    const readMe: File = project.findFile("README.md");
    readMe.replace("# Atomist 'rug-rugs'", "# " + project.name);
    readMe.regexpReplace("generators for creating a Rug archive[\\s\\S]*?\n## Rugs\n", description + "\n\n## Rugs\n\n");
    readMe.regexpReplace("\n## Rugs\n[\\s\\S]*\n## Support\n", "\n## Rugs\n\n## Support\n");
    readMe.replace("/rug-rugs", `/${project.name}`);
    readMe.replace("/atomist/", `/${owner}/`);
    readMe.replace(`/${owner}/rug-cli`, "/atomist/rug-cli");
}

/**
 * Remove all entries from the CHANGELOG except 0.1.0.
 *
 * @param project  Project whose CHANGELOG is to be modified.
 * @param owner    GitHub owner (user or org) of project.
 */
export function cleanChangeLog(project: Project, owner: string): void {
    const changeLog: File = project.findFile("CHANGELOG.md");
    changeLog.regexpReplace("\\d+\\.\\d+\\.\\d+\\.\\.\\.HEAD\n\n[\\S\\s]*## \\[0\\.1\\.0\\]",
        "0.1.0...HEAD\n\n## [0.1.0]");
    changeLog.regexpReplace("\n### Added[\\S\\s]*", "\nAdded\n\n-   Everything\n");
    changeLog.replace("rug-rugs", project.name);
    changeLog.replace("/atomist/", `/${owner}/`);
}
