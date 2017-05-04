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

import {
    CommandHandler, Intent, Parameter, ParseJson, ResponseHandler, Secrets,
    Tags,
} from "@atomist/rug/operations/Decorators";
import {
    CommandPlan, HandleCommand, HandlerContext, HandleResponse,
    Response, ResponseMessage,
} from "@atomist/rug/operations/Handlers";
import { Pattern } from "@atomist/rug/operations/RugOperation";

import { HttpGet } from "../../util/HttpClient";

const rugUrl = "https://atomist.jfrog.io/atomist/rugs/com/atomist/rug/[RELEASE]/rug-[RELEASE].pom";
const rugCliUrl = "https://atomist.jfrog.io/atomist/rugs/com/atomist/rug-cli/[RELEASE]/rug-cli-[RELEASE].pom";
// npm uses a bit of a weired syntax to query scoped packages
const rugsUrl = "https://registry.npmjs.org/@atomist%2Frugs/";

/**
 * Shows the latest versions for rug and rugs.
 */
@CommandHandler("ShowLatestVersions", "Shows the latest versions for rug and rugs")
@Tags("community", "rug")
@Intent("show latest versions")
export class GetLatestVersions implements HandleCommand {

    public handle(command: HandlerContext): CommandPlan {
        const plan = new CommandPlan();

        const jfrogGet = new HttpGet(rugUrl);
        jfrogGet.onSuccess = ({
            kind: "respond", name: "ReceiveRugResponse",
        });

        plan.add(jfrogGet);

        return plan;
    }
}

@ResponseHandler("ReceiveRugResponse", "Receive the pom.xml for the latest Rug release")
class ReceiveRugResponse implements HandleResponse<string> {

    public handle(response: Response<string>): CommandPlan {
        const rugVersion = getVersion(response.body);

        const npmGet = new HttpGet(rugCliUrl);
        npmGet.onSuccess = ({
            kind: "respond", name: "ReceiveRugCliResponse",
            parameters: {
                rugVersion,
            },
        });
        const plan = new CommandPlan();
        plan.add(npmGet);
        return plan;
    }
}

@ResponseHandler("ReceiveRugCliResponse", "Receive the pom.xml for the latest Rug CLI release")
class ReceiveRugCliResponse implements HandleResponse<string> {

    @Parameter({ description: "Rug version from JFrog", pattern: "^.*$" })
    public rugVersion: string;

    public handle(response: Response<string>): CommandPlan {
        const rugCliVersion = getVersion(response.body);

        const npmGet = new HttpGet(rugsUrl);
        npmGet.onSuccess = ({
            kind: "respond", name: "ReceiveNpmResponse",
            parameters: {
                rugVersion: this.rugVersion,
                rugCliVersion,
            },
        });
        const plan = new CommandPlan();
        plan.add(npmGet);
        return plan;
    }
}

@ResponseHandler("ReceiveNpmResponse", "Receive JSON for the latest @atomist/rugs release")
class ReceiveNpmResponse implements HandleResponse<any> {

    @Parameter({ description: "Rug version from JFrog", pattern: "^.*$" })
    public rugVersion: string;

    @Parameter({ description: "Rug CLI version from JFrog", pattern: "^.*$" })
    public rugCliVersion: string;

    public handle( @ParseJson response: Response<any>): CommandPlan {
        const rugsVersion: string = response.body["dist-tags"].latest;

        // tslint:disable-next-line:max-line-length
        const msg = `Lastest version of \`com.atomist:rug\` is \`${this.rugVersion}\` and \`@atomist/rugs\` is \`${rugsVersion}\`.

In  \`.atomist/manifest.yml\` use:

\`\`\`requires: "[${this.rugVersion},${revVersion(this.rugVersion)})"
\`\`\`

and in \`.atomist/package.json\` use:

\`\`\`{
    "dependencies": {
        "@atomist/rugs": "^${rugsVersion}"
    }
}\`\`\`
Latest Rug CLI version is \`${this.rugCliVersion}\`.
`;

        return CommandPlan.ofMessage(
            new ResponseMessage(msg));
    }
}

/**
 * Helper function to extract the version from a pom file
 * @param pom the pom file
 */
function getVersion(pom: string): string {
    return pom.match(`<version>(.*)</version>`)[1];
}

/**
 * Helper function to increment the major digit of a version string
 * @param version version to increment
 */
function revVersion(version: string): string {
    const parts = version.split(".", 2);
    console.log(parts[0]);
    const major = parseInt(parts[0]);
    return `${major + 1}.0.0`;
}

export const getLatestVersions = new GetLatestVersions();
export const receiveRugResponse = new ReceiveRugResponse();
export const receiveRugCliResponse = new ReceiveRugCliResponse();
export const receiveNpmResponse = new ReceiveNpmResponse();
