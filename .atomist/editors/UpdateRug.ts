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
import { Editor, Tags } from "@atomist/rug/operations/Decorators";
import { EditProject } from "@atomist/rug/operations/ProjectEditor";
import { Pattern } from "@atomist/rug/operations/RugOperation";

import { formatPackageJson } from "./ConvertManifestToPackageJson";
import { isRugArchive, NotRugArchiveError } from "./RugEditorsPredicates";
import { updateRugFiles } from "./UpdateSupportFiles";

@Editor("UpdateRug", "updates Rug dependencies and support files")
@Tags("rug", "atomist")
export class UpdateRug implements EditProject {

    public edit(project: Project) {
        if (!isRugArchive(project)) {
            throw new NotRugArchiveError();
        }

        updateRugFiles(project);

        const pkgJsonPath = ".atomist/package.json";
        const pkgJsonFile = project.findFile(pkgJsonPath);
        if (!pkgJsonFile) {
            throw new Error(`failed to load ${pkgJsonPath} from this project`);
        }
        const pkgJson = JSON.parse(pkgJsonFile.content);

        const archivePkgJsonFile = project.backingArchiveProject().findFile(pkgJsonPath);
        if (!archivePkgJsonFile) {
            throw new Error(`failed to load ${pkgJsonPath} from rug-rugs archive`);
        }
        const archivePkgJson = JSON.parse(archivePkgJsonFile.content);

        const deps = ["@atomist/rug", "@atomist/rugs", "@atomist/cortex"];
        deps.forEach(d => pkgJson.dependencies[d] = archivePkgJson.dependencies[d]);
        pkgJson.atomist.requires = archivePkgJson.atomist.requires;

        pkgJsonFile.setContent(formatPackageJson(pkgJson));
    }
}

export const updateRug = new UpdateRug();
