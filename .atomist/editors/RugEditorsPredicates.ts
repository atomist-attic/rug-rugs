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

import deprecated from "deprecated-decorator";

export function isRugArchive(p: Project): boolean {
    return p.fileExists(".atomist/manifest.yml");
}

export function isSetUpForTypeScript(p: Project): boolean {
    return p.fileExists(".atomist/package.json");
}

export class NotRugArchiveError extends Error {
    constructor() {
        super("project does not appear to be a Rug project");
    }
}

export const IsRugArchive = deprecated({
    alternative: "isRugArchive",
    version: "0.30.0",
}, function IsRugArchive(p: Project): boolean {
    return isRugArchive(p);
});

export const IsSetUpForTypeScript = deprecated({
    alternative: "isSetUpForTypeScript",
    version: "0.30.0",
}, function IsSetUpForTypeScript(p: Project): boolean {
    return isSetUpForTypeScript(p);
});
