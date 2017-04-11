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

import { Project } from '@atomist/rug/model/Project'
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'
import { File } from '@atomist/rug/model/File'

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
        ".travis.yml"
    ];
    if (extra != null) {
        toRemove = toRemove.concat(extra);
    }
    for (let f of toRemove) {
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
    let eng: PathExpressionEngine = project.context.pathExpressionEngine;

    let readMePE = new PathExpression<Project, File>("/*[@name='README.md']");
    let readMe: File = eng.scalar(project, readMePE);
    readMe.replace("# Atomist 'rug-editors'", "# " + project.name);
    readMe.regexpReplace("generators for creating a Rug archive[\\s\\S]*?\n## Rugs\n", description + "\n\n## Rugs\n\n");
    readMe.regexpReplace("\n### AddManifestYml[\\s\\S]*\n## Support\n", "\n## Support\n");
    readMe.replace("rug-editors", project.name);
    readMe.replace("atomist-rugs", owner);
}

/**
 * Remove all entries from the CHANGELOG except 0.1.0.
 *
 * @param project  Project whose CHANGELOG is to be modified.
 * @param owner    GitHub owner (user or org) of project.
 */
export function cleanChangeLog(project: Project, owner: string): void {
    let eng: PathExpressionEngine = project.context.pathExpressionEngine;

    let changeLogPE = new PathExpression<Project, File>("/*[@name='CHANGELOG.md']");
    let changeLog: File = eng.scalar(project, changeLogPE);
    changeLog.regexpReplace("\\d+\\.\\d+\\.\\d+\\.\\.\\.HEAD\n\n[\\S\\s]*## \\[0\\.1\\.0\\]", "0.1.0...HEAD\n\n## [0.1.0]");
    changeLog.regexpReplace("\n### Added[\\S\\s]*", "\nAdded\n\n-   Everything\n");
    changeLog.replace("rug-editors", project.name);
    changeLog.replace("atomist-rugs", owner);
}
