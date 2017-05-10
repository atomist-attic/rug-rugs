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

/**
 * Increment the Rug archive version in manifest.yml
 */
@Editor("BumpVersion", "bump the version of this Rug archive project")
@Tags("rug", "version")
export class BumpVersion implements EditProject {

    @Parameter({
        displayName: "version component",
        description: "how bumped is it? major/minor/patch",
        pattern: "^(major|minor|patch)$",
        validInput: "one of: major, minor, patch",
        minLength: 5,
        maxLength: 5,
        required: false,
    })
    public component: string = "minor";

    public edit(project: Project) {
        const versionRegex = /version: "?(\d+)\.(\d+)\.(\d+)"?/;
        const manifest = project.findFile(".atomist/manifest.yml");
        if (manifest == null) {
            // not a rug archive
            return;
        }
        const versionMatch = versionRegex.exec(manifest.content);
        if (!versionMatch) {
            throw new Error(
                // tslint:disable-next-line:max-line-length
                `Unable to parse current version. I can only increment a nice simple 1.2.3 format. But I see: ${manifest.content}`);
        }

        let major = parseInt(versionMatch[1], 10);
        let minor = parseInt(versionMatch[2], 10);
        let patch = parseInt(versionMatch[3], 10);
        if (this.component === "major") {
            major = major + 1;
            minor = 0;
            patch = 0;
        } else if (this.component === "minor") {
            minor = minor + 1;
            patch = 0;
        } else if (this.component === "patch") {
            patch = patch + 1;
        } else {
            throw new Error(`Unknown version component '${this.component}'. Should be major|minor|patch`);
        }

        manifest.regexpReplace("version:.*", `version: "${major}.${minor}.${patch}"`);
    }
}

export const bumpVersion = new BumpVersion();
