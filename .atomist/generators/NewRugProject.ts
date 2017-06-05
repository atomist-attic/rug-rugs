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
import { Generator, Parameter, Tags } from "@atomist/rug/operations/Decorators";
import { PopulateProject } from "@atomist/rug/operations/ProjectGenerator";
import { Pattern } from "@atomist/rug/operations/RugOperation";
import { PathExpression, PathExpressionEngine } from "@atomist/rug/tree/PathExpression";

import { RugParameters } from "../editors/RugParameters";
import { generateRugProject } from "./RugGeneratorFunctions";

/**
 * Create a new Rug project based on this project.
 */
@Generator("NewRugProject", "creates a minimal Rug archive project with metadata and no Rugs")
@Tags("rug", "atomist")
export class NewRugProject implements PopulateProject {

    @Parameter({
        ...RugParameters.GroupId,
    })
    public owner: string;

    @Parameter({
        displayName: "Project Description",
        description: "short descriptive text describing the new Rug project",
        pattern: Pattern.any,
        validInput: "free text",
        minLength: 1,
        maxLength: 100,
    })
    public description: string;

    @Parameter({
        displayName: "Version",
        description: "initial version of the project, e.g., 1.2.3",
        pattern: Pattern.semantic_version,
        validInput: "a valid semantic version, http://semver.org",
        minLength: 5,
        maxLength: 100,
        required: false,
    })
    public version: string = "0.1.0";

    public populate(project: Project) {
        const toRemove: string[] = [
            "CHANGELOG.md",
            "LICENSE",
        ];
        generateRugProject(project, this.owner, this.description, this.version, toRemove);
    }
}

export const newRugProject = new NewRugProject();
