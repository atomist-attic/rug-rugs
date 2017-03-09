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

import { Project } from '@atomist/rug/model/Project';
import { PathExpressionEngine } from '@atomist/rug/tree/PathExpression';
import { File } from '@atomist/rug/model/File';

/**
 * Append the provided instructions to the "Rugs" section of the
 * project README.  The instructions are inserted immediately prior to
 * the "## Support" section.  All dollar signs ($) in the instructions
 * must be escaped so they are not confused with regular expression
 * capture group identifiers.
 *
 * @param project       Project whose README should be modified.
 * @param instructions  Text to insert. It should contain all headers, text, and internal new lines.
 */
export function addInstructionsToReadMe(project: Project, instructions: string): void {
    const eng: PathExpressionEngine = project.context().pathExpressionEngine();
    eng.with<File>(project, "/*[@name='README.md']", r => {
        if (r.containsMatch("\n## Rugs[\\S\\s]*\n## Support")) {
            r.regexpReplace("\n## Support", instructions + "\n## Support");
        }
    });
}

/**
 * Construct the standard README instructions for a Rug.  You do not
 * need to have trailing newlines in any of the parameters.  Dollar
 * signs ($) in any text supplied are escaped.
 *
 * @param name           Name of the Rug.
 * @param description    Text description to introduction the function of the Rug.
 * @param example        Verbatim block showing how to invoke Rug using the CLI.
 * @param example_text   Text to follow example explaining what it does.
 * @param prerequisites  Text explaining prerequisites for running the Rug, if any.
 * @param parameters     Array of parameter table row text.
 *
 * @returns              Markdown-format instructions for running a Rug suitable for adding to a README
 */
export function readMeInstructions(
    name: string,
    description: string,
    example: string,
    example_text: string,
    prerequisites?: string,
    parameters?: string[]
): string {
    let instructions: string = "### " + name + "\n\n";
    instructions += description + "\n\n";
    if (prerequisites != null && prerequisites != "") {
        instructions += "#### Prerequisites\n\n" + prerequisites + "\n\n";
    } else {
        instructions += "#### Prerequisites\n\nThis Rug has no prerequisites.\n\n";
    }
    if (parameters != null && parameters.length > 0) {
        instructions += "#### Parameters\n\nThis Rug takes following parameters.\n\n"
            + "Name | Required | Default | Description\n-----|----------|---------|------------\n"
            + parameters.join("\n") + "\n\n";
    } else {
        instructions += "#### Parameters\n\n This Rug has no parameters.\n\n"
    }
    instructions += "#### Running\n\nRun this Rug as follows:\n\n```\n"
        + example + "\n```\n\n" + example_text + "\n";

    return instructions.replace(/\$/g, "\\$");
}
