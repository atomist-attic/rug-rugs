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
import { Given, ProjectScenarioWorld, Then, When } from "@atomist/rug/test/project/Core";

import { packageJsonPath } from "../../editors/ConvertManifestToPackageJson";

When("UpdateRug is run", (p: Project, w: ProjectScenarioWorld) => {
    const editor = w.editor("UpdateRug");
    w.editWith(editor, {});
});

Then("the package file requires the current version of rug", (p: Project, w: ProjectScenarioWorld) => {
    const rugVersion = JSON.parse(p.backingArchiveProject().findFile(".atomist/package.json").content).atomist.requires;
    return p.fileContains(packageJsonPath, `"${rugVersion}"`);
});

Then("the package file depends on the current version of rugs", (p: Project, w: ProjectScenarioWorld) => {
    const rugsVersion = JSON.parse(p.backingArchiveProject().findFile(".atomist/package.json").content)
        .dependencies["@atomist/rugs"];
    return p.fileContains(packageJsonPath, `"@atomist/rugs": "${rugsVersion}"`);
});
