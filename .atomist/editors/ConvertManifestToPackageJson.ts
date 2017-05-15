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

@Editor("ConvertManifestToPackageJson",
    "converts an existing Rug archive manifest.yml to a package.json")
@Tags("rug", "atomist")
export class ConvertManifestToPackageJson implements EditProject {

    private packageJsonName = ".atomist/package.json";
    private manifestYamlName = ".atomist/manifest.yml";

    public edit(project: Project) {
        if (project.fileExists(this.manifestYamlName)) {
            const manifestContent = project.findFile(this.manifestYamlName).content;
            const manifestYaml = yaml.load(manifestContent);
            const packageJson = this.loadPackageJson(project);

            const newPackageJson: any = {};
            // First we add name and version to the top of the package.json
            newPackageJson.name = `@${manifestYaml.group}/${manifestYaml.artifact}`;
            newPackageJson.version = manifestYaml.version;

            // Then we copy all existing keys into the new package.json
            // tslint:disable-next-line:forin
            for (const key in packageJson) {
                newPackageJson[key] = packageJson[key];
            }

            // Create or retrieve atomist section from package.json
            let atomist: any = {};
            if (newPackageJson.atomist == null) {
                newPackageJson.atomist = atomist;
            } else {
                atomist = newPackageJson.atomist;
            }

            atomist.requires = manifestYaml.requires;

            // Add in dependencies
            if (manifestYaml.dependencies !== null) {
                atomist.dependencies = {};
                for (const d of manifestYaml.dependencies) {
                    const parts = (d as string).split(":");
                    atomist.dependencies[`${parts[0]}:${parts[1]}`] = parts[2];
                }
            }

            // Add in extensions
            if (manifestYaml.extensions !== null) {
                atomist.extensions = {};
                for (const d of manifestYaml.extensions) {
                    const parts = (d as string).split(":");
                    atomist.extensions[`${parts[0]}:${parts[1]}`] = parts[2];
                }
            }

            if (manifestYaml.excludes !== null) {
                atomist.excludes = {};
                // The json keys don't use _. So we convert them to -
                atomist.excludes.editors = manifestYaml.excludes.editors;
                atomist.excludes.generators = manifestYaml.excludes.generators;
                atomist.excludes["command-handlers"] = manifestYaml.excludes.command_handlers;
                atomist.excludes["event-handlers"] = manifestYaml.excludes.event_handlers;
                atomist.excludes["response-handlers"] = manifestYaml.excludes.response_handlers;
            }

            const newPackageJsonContent = JSON.stringify(newPackageJson, null, 2);
            project.findFile(this.packageJsonName).setContent(newPackageJsonContent);
            project.deleteFile(this.manifestYamlName);
        }
    }

    private loadPackageJson(project: Project): any {
        if (!project.fileExists(this.packageJsonName)) {
            project.copyEditorBackingFileOrFail(this.packageJsonName);
        }
        return JSON.parse(project.findFile(this.packageJsonName).content);
    }
}

export const convertManifestToPackageJson = new ConvertManifestToPackageJson();
