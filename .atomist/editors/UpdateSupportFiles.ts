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
import { updateYamlDocument } from "@atomist/yaml-updater/Yaml";

import * as yaml from "js-yaml";
import * as _ from "lodash";

import { formatPackageJson } from "./ConvertManifestToPackageJson";
import { isRugArchive, NotRugArchiveError } from "./RugEditorsPredicates";

/**
 * Update files related to Rugs, e.g., TypeScript configs, build scripts,
 * and Git files.
 */
@Editor("UpdateSupportFiles", "updates Rug project TypeScript and build files")
@Tags("rug", "atomist", "typescript")
export class UpdateSupportFiles implements EditProject {

    public edit(project: Project) {
        if (!isRugArchive(project)) {
            throw new NotRugArchiveError();
        }

        updateRugFiles(project);
    }
}

export const updateSupportFiles = new UpdateSupportFiles();

/**
 * Update TypeScript and build files to latest standards.
 *
 * @param project project with files to update
 */
export function updateRugFiles(project: Project) {
    const oldFiles = [
        ".atomist/build/cli-build.yml",
        ".atomist/build/cli-dev.yml",
        ".atomist/build/cli-release.yml",
    ];
    for (const f of oldFiles) {
        project.deleteFile(f);
    }

    const supportFiles = [
        ".atomist/tsconfig.json",
        ".atomist/tslint.json",
        ".atomist/.gitignore",
        ".atomist/build/cli.yml",
        ".atomist/build/success",
        ".atomist/build/error",
        ".atomist/build/publish-to-team",
        ".atomist/build/travis-build.bash",
        "CODE_OF_CONDUCT.md",
        "CONTRIBUTING.md",
    ];
    for (const f of supportFiles) {
        project.deleteFile(f);
        project.copyEditorBackingFileOrFail(f);
    }

    const gitAttributes = ".gitattributes";
    if (project.fileExists(gitAttributes)) {
        if (!project.fileContains(gitAttributes, ".atomist.yml")) {
            const ga = project.findFile(gitAttributes);
            ga.setContent(ga.content + "\n.atomist.yml linguist-generated=true\n");
        }
    } else {
        project.copyEditorBackingFileOrFail(gitAttributes);
    }

    convergePackageJson(project);
    convergeTravisYml(project);
}

/**
 * Use archive package.json to update package.json
 *
 * @param project project with files to update
 */
function convergePackageJson(project: Project) {
    const pkgJsonPath = ".atomist/package.json";
    const archivePkgJsonFile = project.backingArchiveProject().findFile(pkgJsonPath);
    if (!archivePkgJsonFile) {
        throw new Error(`failed to load ${pkgJsonPath} from rug-rugs archive`);
    }
    const archivePkgJson = JSON.parse(archivePkgJsonFile.content);
    const updatable = ["directories", "scripts"];
    const updates = {};
    updatable.forEach(u => updates[u] = archivePkgJson[u]);

    const pkgJsonFile = project.findFile(pkgJsonPath);
    if (!pkgJsonFile) {
        throw new Error(`failed to load ${pkgJsonPath} from this project`);
    }

    pkgJsonFile.setContent(updatePackageJson(pkgJsonFile.content, updates));
}

/**
 * Ensure relevant elements of the package.json are up to date.
 *
 * @param current contents of the Rug project package.json
 * @param updates object containing elements to check and update
 * @return new contents for the Rug project package.json
 */
export function updatePackageJson(current: string, updates: {}): string {
    let updated = current;
    try {
        const pkg = JSON.parse(updated);
        _.merge(pkg, updates);

        const matches = /\s+$/.exec(updated);
        const trailingSpace = (matches) ? matches[0] : "";
        updated = formatPackageJson(pkg);
    } catch (e) {
        const err = e as Error;
        const msg = `failed to parse current package.json:'${current}':${err.name}:${err.message}\n${err.stack}`;
        console.log(msg);
        throw new Error(msg);
    }
    return updated;
}

/**
 * Use archive .travis.yml to update project .travis.yml
 *
 * @param project project with files to update
 */
function convergeTravisYml(project: Project) {
    const travisPath = ".travis.yml";
    const travisFile = project.findFile(travisPath);
    if (!travisFile) {
        console.log(`no Travis CI ${travisPath} file in this project`);
        return;
    }

    const archiveTravisFile = project.backingArchiveProject().findFile(travisPath);
    if (!archiveTravisFile) {
        throw new Error(`failed to load ${travisPath} from rug-rugs archive`);
    }
    const archiveTravis = yaml.load(archiveTravisFile.content);

    const updatable = ["install", "script", "cache"];
    const updates = {};
    updatable.forEach(u => updates[u] = archiveTravis[u]);

    travisFile.setContent(updateYamlDocument(updates, travisFile.content));
}
