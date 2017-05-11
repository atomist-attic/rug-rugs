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

        const manifestPath = ".atomist/manifest.yml";
        const manifest = project.findFile(manifestPath);
        if (manifest === null || manifest === undefined) {
            const err = "failed to load manifest";
            throw new Error(err);
        }
        const archiveManifest = manifestPath + "-archive.tmp";
        project.copyEditorBackingFileOrFailToDestination(manifestPath, archiveManifest);
        const archiveManifestContents = project.findFile(archiveManifest).content;
        project.deleteFile(archiveManifest);
        const versionRegex = /^requires\s*:\s*(.*)\s*$/m;
        const archiveRugVersionMatch = versionRegex.exec(archiveManifestContents);
        if (archiveRugVersionMatch === null || archiveRugVersionMatch.length < 2) {
            throw new Error(`failed to match version in archive manifest: ${archiveManifestContents}`);
        }
        manifest.regexpReplace("(?m)^requires\\s*:.*", `requires: ${archiveRugVersionMatch[1]}`);

        const pkgJsonPath = ".atomist/package.json";
        const pkgJson = project.findFile(pkgJsonPath);
        if (pkgJson === null || pkgJson === undefined) {
            throw new Error("failed to load package.json");
        }
        const archivePkgJson = pkgJsonPath + "-archive.tmp";
        project.copyEditorBackingFileOrFailToDestination(pkgJsonPath, archivePkgJson);
        const pkgJsonObj = JSON.parse(project.findFile(archivePkgJson).content);
        project.deleteFile(archivePkgJson);
        const rugsName = "@atomist/rugs";
        const rugsVersion: string = pkgJsonObj.dependencies[rugsName];
        pkgJson.regexpReplace(`"@atomist/rugs"\\s*:\\s*"[^"]+"(,?)`, `"@atomist/rugs": "${rugsVersion}"$1`);
    }
}

export const updateRug = new UpdateRug();
