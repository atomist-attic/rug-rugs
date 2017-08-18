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

import * as yaml from "js-yaml";

export const packageJsonPath = ".atomist/package.json";
const manifestYamlPath = ".atomist/manifest.yml";

/**
 * Convert an Atomist manifest.yml into a package.json.
 */
@Editor("ConvertManifestToPackageJson",
    "converts an existing Rug archive manifest.yml to a package.json")
@Tags("rug", "atomist")
export class ConvertManifestToPackageJson implements EditProject {

    public edit(project: Project) {
        if (!project.fileExists(manifestYamlPath)) {
            console.log(`Project ${project.name} does not have a ${manifestYamlPath}`);
            return;
        }

        const manifestContent = project.findFile(manifestYamlPath).content;
        const manifestYaml = yaml.load(manifestContent);
        const packageJson = loadPackageJson(project);

        const newPackageJson = customizePackageJson(project, manifestYaml.artifact,
            manifestYaml.group, manifestYaml.version, false);

        let atomist: any = {};
        if (!newPackageJson.atomist) {
            newPackageJson.atomist = atomist;
        } else {
            atomist = newPackageJson.atomist;
        }

        atomist.requires = manifestYaml.requires;

        if (manifestYaml.dependencies) {
            atomist.dependencies = {};
            for (const d of manifestYaml.dependencies) {
                const parts = (d as string).split(":");
                atomist.dependencies[`${parts[0]}:${parts[1]}`] = parts[2];
            }
        }

        if (manifestYaml.extensions) {
            atomist.extensions = {};
            for (const d of manifestYaml.extensions) {
                const parts = (d as string).split(":");
                atomist.extensions[`${parts[0]}:${parts[1]}`] = parts[2];
            }
        }

        if (manifestYaml.excludes) {
            atomist.excludes = {};
            // The json keys don't use _. So we convert them to -
            atomist.excludes.editors = manifestYaml.excludes.editors;
            atomist.excludes.generators = manifestYaml.excludes.generators;
            atomist.excludes["command-handlers"] = manifestYaml.excludes.command_handlers;
            atomist.excludes["event-handlers"] = manifestYaml.excludes.event_handlers;
            atomist.excludes["response-handlers"] = manifestYaml.excludes.response_handlers;
        }

        project.findFile(packageJsonPath).setContent(formatPackageJson(newPackageJson));
        project.deleteFile(manifestYamlPath);
    }

}

export const convertManifestToPackageJson = new ConvertManifestToPackageJson();

const customizeKeys = [
    "name",
    "version",
    "author",
    "description",
    "repository",
    "homepage",
    "bugs",
];

function loadPackageJson(project: Project): any {
    if (!project.fileExists(packageJsonPath)) {
        const archivePkgJsonFile = project.backingArchiveProject().findFile(packageJsonPath);
        if (!archivePkgJsonFile) {
            throw new Error(`failed to find ${packageJsonPath} in rug-rugs archive`);
        }
        const archivePkgJson = JSON.parse(archivePkgJsonFile.content);
        for (const k of customizeKeys) {
            delete archivePkgJson[k];
        }
        for (const deleteDeps of ["deprecated-decorator", "js-yaml"]) {
            delete archivePkgJson.dependencies[deleteDeps];
        }
        for (const deleteDevDeps of ["@types/js-yaml"]) {
            delete archivePkgJson.devDependencies[deleteDevDeps];
        }
        delete archivePkgJson.atomist.excludes;
        project.addFile(packageJsonPath, JSON.stringify(archivePkgJson));
        return archivePkgJson;
    } else {
        return JSON.parse(project.findFile(packageJsonPath).content);
    }
}

export function customizePackageJson(
    project: Project,
    artifact: string,
    group: string,
    version: string,
    force: boolean): any {
    const pkgJson = loadPackageJson(project);
    const slug = `${group}/${artifact}`;
    const updates = {
        name: `@${slug}`,
        version,
        author: group,
        description: `Atomist Rugs from ${slug}`,
        repository: {
            type: "git",
            url: `https://github.com/${slug}.git`,
        },
        homepage: `https://github.com/${slug}#readme`,
        bugs: { url: `https://github.com/${slug}/issues` },
    };
    for (const k of customizeKeys) {
        if (force || !pkgJson[k]) {
            pkgJson[k] = updates[k];
        }
    }

    return pkgJson;
}

export function formatPackageJson(pkgJson: any): string {
    return JSON.stringify(pkgJson, null, 2) + "\n";
}
