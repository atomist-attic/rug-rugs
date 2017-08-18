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

import { expect } from "chai";

When("UpdateRug is run", (p: Project, w: ProjectScenarioWorld) => {
    const editor = w.editor("UpdateRug");
    w.editWith(editor, {});
});

Then("the package file depends on the current versions of rug dependencies", (p: Project) => {
    const pkgJsonPath = ".atomist/package.json";
    const archivePkg = JSON.parse(p.backingArchiveProject().findFile(pkgJsonPath).content);
    const pkg = JSON.parse(p.findFile(pkgJsonPath).content);
    expect(archivePkg.atomist.requires).to.equal(pkg.atomist.requires);
    expect(archivePkg.dependencies["@atomist/rug"]).to.equal(pkg.dependencies["@atomist/rug"]);
    expect(archivePkg.dependencies["@atomist/rugs"]).to.equal(pkg.dependencies["@atomist/rugs"]);
    expect(archivePkg.dependencies["@atomist/cortex"]).to.equal(pkg.dependencies["@atomist/cortex"]);
});
