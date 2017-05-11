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

const manifest = ".atomist/manifest.yml";
const packageJson = ".atomist/package.json";

When("UpdateRug is run", (p: Project, w: ProjectScenarioWorld) => {
    const editor = w.editor("UpdateRug");
    w.editWith(editor, {});
});

Then("the manifest file requires the current version of rug", (p: Project, w: ProjectScenarioWorld) => {
    const archiveManifest = "manny.yml";
    p.copyEditorBackingFileOrFailToDestination(manifest, archiveManifest);
    const req = p.findFile(archiveManifest).content.split("\n").filter((l) => /^requires:/.test(l));
    return p.fileContains(manifest, req[0]);
});

Then("the package file depends on the current version of rugs", (p: Project, w: ProjectScenarioWorld) => {
    const archivePkg = "pkg.json";
    p.copyEditorBackingFileOrFailToDestination(packageJson, archivePkg);
    const dep = p.findFile(archivePkg).content.split("\n").filter((l) => /"@atomist\/rugs":/.test(l));
    return p.fileContains(packageJson, dep[0]);
});
