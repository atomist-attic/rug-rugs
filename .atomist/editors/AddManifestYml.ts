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
import { Project } from '@atomist/rug/model/Project'
import { File } from '@atomist/rug/model/File'
import { Pattern } from '@atomist/rug/operations/RugOperation'
import { Editor, Parameter, Tags } from '@atomist/rug/operations/Decorators'
import { PathExpression, PathExpressionEngine } from '@atomist/rug/tree/PathExpression'

import { IsRugArchive } from './RugEditorsPredicates'

@Editor("AddManifestYml", "add Rug archive manifest")
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
    archive_name: string;

    @Parameter({
        displayName: "Rug Archive Group ID",
        description: "Maven group identifier, often used to provide a namespace for your rugs, e.g., company-rugs, typically the GitHub owner",
        pattern: Pattern.group_id,
        validInput: "a valid Maven group ID, which starts with a letter, -, or _ and contains only alphanumeric, -, and _ characters and may having leading period separated identifiers starting with letters or underscores and containing only alphanumeric and _ characters",
        minLength: 1,
        maxLength: 100
    })
    group_id: string;

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

        let eng: PathExpressionEngine = project.context().pathExpressionEngine();

        let manifestPE = new PathExpression<Project, File>("/*[@name='.atomist']/*[@name='manifest.yml']");
        let manifest: File = eng.scalar(project, manifestPE);
        manifest.regexpReplace("(?m)^group:.*", 'group: "' + this.group_id + '"');
        manifest.regexpReplace("(?m)^artifact:.*", 'artifact: "' + this.archive_name + '"');
        manifest.regexpReplace("(?m)^version:.*", 'version: "' + this.version + '"');
        manifest.regexpReplace("(?m)^dependencies:\s*\n(\s*-.*\n)*", "dependencies:\n");
        manifest.regexpReplace("(?m)^extensions:\s*\n(\s*-.*\n)*", "extensions:\n");
        manifest.regexpReplace("(?m)^repo:.*\n", "");
        manifest.regexpReplace("(?m)^branch:.*\n", "");
        manifest.regexpReplace("(?m)^sha:.*\n", "");
        manifest.regexpReplace("(?m)^---\n", "");
        manifest.regexpReplace("(?m)^\n", "");
    }
}

export const addManifestYml = new AddManifestYml()
