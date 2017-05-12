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

import { File } from "@atomist/rug/model/File";
import { Project } from "@atomist/rug/model/Project";
import { Editor, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { EditProject } from "@atomist/rug/operations/ProjectEditor";
import { Pattern } from "@atomist/rug/operations/RugOperation";
import { PathExpressionEngine } from "@atomist/rug/tree/PathExpression";

/**
 * AddLicense editor
 * - Adds LICENSE file to project
 * - Adds license header comment to each *.ts file under included directories
 */
@Editor("AddLicense", "adds LICENSE file and license headers to project files")
@Tags("rug", "atomist", "license")
export class AddLicense implements EditProject {
    @Parameter({
        displayName: "Search Path",
        description: "if provided, editor will only add license headers to *.ts files under specified paths," +
        ` e.g., "typescript/src,typescript/test"`,
        pattern: Pattern.any,
        validInput: "a comma separated list of paths to search",
        minLength: 1,
        maxLength: 100,
        required: false,
    })
    public include: string = "";

    // TODO: Add more license types
    @Parameter({
        displayName: "License type",
        description: "license type (currently only supporting aslv2: Apache version 2)",
        pattern: "^aslv2$",
        validInput: "Possible values: aslv2",
        minLength: 5,
        maxLength: 5,
        required: false,
    })
    public license: string = "aslv2";

    public edit(project: Project) {
        this.addLicenseFile(project);
        this.addLicenseHeaders(project);
    }

    private addLicenseFile(project: Project) {
        if (project.findFile("LICENSE") === null) {
            const licensePath = `.atomist/resources/licenses/${this.license}.txt`;
            project.copyEditorBackingFileOrFailToDestination(licensePath, "LICENSE");
        }
    }

    private startsWith(thisStr: string, withStr: string): boolean {
        return thisStr.substr(0, withStr.length) === withStr;
    }

    private fileUnderPath(file: File, paths: string[]): boolean {
        return paths.length === 0 ||
            paths.some((path, idx, arr) => {
                return this.startsWith(file.path, path);
            });
    }

    private typeScriptFile(file: File): boolean {
        return /\.ts$/.test(file.filename);
    }

    private addLicenseHeaders(project: Project) {
        const headerPath = `.atomist/resources/licenses/${this.license}-header.txt`;
        const tmpHeaderPath = "header-tmp.txt";
        project.copyEditorBackingFileOrFailToDestination(headerPath, tmpHeaderPath);
        const licenseHeader: File = project.findFile(tmpHeaderPath);
        const header = licenseHeader.content;
        project.deleteFile(tmpHeaderPath);

        const eng: PathExpressionEngine = project.context.pathExpressionEngine;
        // TODO: We should be able to filter by file extension in path expression
        // But obvious *.ts or [@name='*.ts'] don't work"
        eng.with<File>(project, `//File()`, (f) => {
            const paths = this.include.split(",").map((val, idx, arr) => {
                return val.trim();
            });
            if (this.typeScriptFile(f)
                && this.fileUnderPath(f, paths)
                && !f.containsMatch("(?i)licensed under")) {
                f.prepend(header);
            }
        });
    }
}

export const addLicense = new AddLicense();
