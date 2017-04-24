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

import { Pattern } from "@atomist/rug/operations/RugOperation";

export const RugParameters = {
    Name: {
        displayName: "Rug Name",
        description: "name of a Rug",
        pattern: "^[A-Z][A-Za-z0-9]*$",
        validInput: "a valid Rug name starting with a capital letter and containing only alphanumeric" +
        " characters, from one to 100 characters long",
        minLength: 1,
        maxLength: 100,
    },
    Description: {
        displayName: "Rug Description",
        description: "short description of a Rug",
        pattern: Pattern.any,
        validInput: "free text",
        minLength: 1,
        maxLength: 100,
    },
    GroupId: {
        displayName: "Rug Archive Group ID",
        description: "Maven group identifier, often used to provide a namespace for your rugs, e.g.," +
        " company-rugs, typically the GitHub owner",
        pattern: Pattern.group_id,
        validInput: "a valid Maven group ID, which starts with a letter, -, or _ and contains only alphanumeric," +
        " -, and _ characters and may having leading period separated identifiers starting with letters or" +
        " underscores and containing only alphanumeric and _ characters",
        minLength: 1,
        maxLength: 100,
    },
};
