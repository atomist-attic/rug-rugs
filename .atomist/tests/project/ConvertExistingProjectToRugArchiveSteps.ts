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

const archiveName = "my-rug-archive";
const groupId = "my-rug-group";
const version = "0.0.1";

When("ConvertExistingProjectToRugArchive is run", (p: Project, world) => {
    const w = world as ProjectScenarioWorld;
    const editor = w.editor("ConvertExistingProjectToRugArchive");
    w.editWith(editor, { archiveName, groupId, version });
});

const manifest = ".atomist/manifest.yml";

Then("the Rug archive manifest exists", (p, world) => {
    return p.fileExists(manifest);
});

Then("the Rug archive manifest contains the archive name", (p: Project, world) => {
    return p.fileContains(manifest, `artifact: "${archiveName}"`);
});

Then("the Rug archive manifest contains the group", (p: Project, world) => {
    return p.fileContains(manifest, 'group: "' + groupId + '"');
});

Then("the Rug archive manifest contains the version", (p: Project, world) => {
    return p.fileContains(manifest, version);
});
