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
import { Editor, Tags } from '@atomist/rug/operations/Decorators'

@Editor("AddTypeScript", "adds TypeScript supporting files to a Rug archive project")
@Tags("rug", "typescript")
class AddTypeScript implements EditProject {

    edit(project: Project) {
        if (!project.fileExists(".atomist/manifest.yml")) {
            return;
        }

        let packageJsonPath = ".atomist/package.json";
        let tsconfigJsonPath = ".atomist/tsconfig.json";
        let gitignorePath = ".atomist/.gitignore";
        let nodeModulesPath = ".atomist/node_modules";
        project.copyEditorBackingFileOrFail(packageJsonPath);
        project.copyEditorBackingFileOrFail(tsconfigJsonPath);
        project.copyEditorBackingFileOrFail(gitignorePath);
        project.copyEditorBackingFilesPreservingPath(nodeModulesPath);
    }
}

export const addTypeScript = new AddTypeScript()
