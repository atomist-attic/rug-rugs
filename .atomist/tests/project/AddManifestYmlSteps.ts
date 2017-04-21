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
import { Given, When, Then, ProjectScenarioWorld } from "@atomist/rug/test/project/Core";

When("AddManifestYml for AddManifestYml should add the Rug manifest", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddManifestYml");
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    psworld.editWith(editor, { archiveName: "my-rug-archive", groupId: "my-rug-group", version: "0.0.1", manifest: ".atomist/manifest.yml" });
});

Then("fileExists manifest for AddManifestYml should add the Rug manifest", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return p.fileExists(manifest);
});

Then("fileContains manifest artifact archiveName for AddManifestYml should add the Rug manifest", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return p.fileContains(manifest, 'artifact: "' + archiveName + '"');
});

Then("fileContains manifest group groupId for AddManifestYml should add the Rug manifest", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return p.fileContains(manifest, 'group: "' + groupId + '"');
});

Then("fileContains manifest version for AddManifestYml should add the Rug manifest", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return p.fileContains(manifest, version);
});

Then("not result fileContains manifest rug editors for AddManifestYml should add the Rug manifest", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return !p.fileContains(manifest, "rug-editors");;
});

Then("not result fileContains manifest atomist rugs for AddManifestYml should add the Rug manifest", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return !p.fileContains(manifest, "atomist");;
});

Then("not result fileContains manifest repo for AddManifestYml should add the Rug manifest", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return !p.fileContains(manifest, "repo:");;
});

Then("not result fileContains manifest branch for AddManifestYml should add the Rug manifest", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return !p.fileContains(manifest, "branch:");;
});

Then("not result fileContains manifest sha for AddManifestYml should add the Rug manifest", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return !p.fileContains(manifest, "sha:");;
});

Then("not result fileContains manifest for AddManifestYml should add the Rug manifest", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let version = "0.0.1";
    let manifest = ".atomist/manifest.yml";
    return !p.fileContains(manifest, "---");;
});

When("AddManifestYml for AddManifestYml should add the Rug manifest using default version", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddManifestYml");
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let manifest = ".atomist/manifest.yml";
    psworld.editWith(editor, { archiveName: "my-rug-archive", groupId: "my-rug-group", manifest: ".atomist/manifest.yml" });
});

Then("fileExists manifest for AddManifestYml should add the Rug manifest using default version", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let manifest = ".atomist/manifest.yml";
    return p.fileExists(manifest);
});

Then("fileContains manifest artifact archiveName for AddManifestYml should add the Rug manifest using default version", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let manifest = ".atomist/manifest.yml";
    return p.fileContains(manifest, 'artifact: "' + archiveName + '"');
});

Then("fileContains manifest group groupId for AddManifestYml should add the Rug manifest using default version", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let manifest = ".atomist/manifest.yml";
    return p.fileContains(manifest, 'group: "' + groupId + '"');
});

Then("fileContains manifest 0 1 0 for AddManifestYml should add the Rug manifest using default version", (p, world) => {
    let archiveName = "my-rug-archive";
    let groupId = "my-rug-group";
    let manifest = ".atomist/manifest.yml";
    return p.fileContains(manifest, "0.1.0");
});

When("AddManifestYml archiveName is my-rug-archive for AddManifestYml should fail if parameters are missing", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddManifestYml");

    psworld.editWith(editor, { archiveName: "my-rug-archive" });
});

When("AddManifestYml archiveName is my-rug-archive, groupId is my-rug-group, version is 0.0.1 for AddManifestYml should make no change if project already contains a manifest", (p, world) => {
    let psworld = world as ProjectScenarioWorld;
    let editor = psworld.editor("AddManifestYml");

    psworld.editWith(editor, { archiveName: "my-rug-archive", groupId: "my-rug-group", version: "0.0.1" });
});

Then("the gitignore file should ignore npm debug log", (p, world) => {
    return p.fileContains(".atomist/.gitignore", "npm-debug.log");
});
