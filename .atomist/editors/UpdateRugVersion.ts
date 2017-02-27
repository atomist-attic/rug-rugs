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

import { EditProject } from '@atomist/rug/operations/ProjectEditor'
import { Project } from '@atomist/rug/model/Core'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'
import { File } from '@atomist/rug/model/File'

import { IsRugArchive } from './RugEditorsPredicates'

@Editor("UpdateRugVersion", "update Rug archive Rug dependency version")
@Tags("rug", "atomist")
class UpdateRugVersion implements EditProject {

    @Parameter({
        displayName: "Rug Version for manifest.yml",
        description: "version of Rug dependency",
        pattern: Pattern.version_range,
        validInput: "a valid Rug version of the form M.N.P or a version range of the form [M.N.P,X.Y.Z) where a square bracket includes the adjacent version and a parenthesis excludes it",
        minLength: 5,
        maxLength: 100
    })
    manifest_version: string;

    @Parameter({
        displayName: "Rug Version for package.json",
        description: "version of Rug dependency",
        pattern: Pattern.any,
        validInput: "a valid NPM dependency version, https://docs.npmjs.com/files/package.json#dependencies, representing valid Rug version(s)",
        minLength: 5,
        maxLength: 100
    })
    package_version: string;

    edit(project: Project) {
        if (!IsRugArchive(project)) {
            return;
        }

        let eng: PathExpressionEngine = project.context().pathExpressionEngine();

        let manifestPE = new PathExpression<Project, File>("/*[@name='.atomist']/*[@name='manifest.yml']");
        let manifest: File = eng.scalar(project, manifestPE);
        manifest.regexpReplace('(?m)^\s*requires:.*$', 'requires: "' + this.manifest_version + '"');

        if (project.fileExists(".atomist/package.json")) {
            let pkgJsonPE = new PathExpression<Project, File>("/*[@name='.atomist']/*[@name='package.json']");
            let pkgJson: File = eng.scalar(project, pkgJsonPE);
            pkgJson.regexpReplace('"@atomist/rug"\\s*:\\s*"[^"]*"', '"@atomist/rug": "' + this.package_version + '"');
        }
    }
}

export const updateRugVersion = new UpdateRugVersion()
