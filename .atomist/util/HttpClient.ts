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
    CommandPlan, CommandRespondable, Execute, HandleCommand, HandlerContext,
    Respond, ResponseMessage,
} from "@atomist/rug/operations/Handlers";

export type Method = "post" | "get" | "patch" | "delete" | "put" | "head";

export class HttpRequest implements CommandRespondable<Execute> {

    public instruction: Execute;
    public onSuccess?: CommandPlan | Respond;
    public onError?: CommandPlan | Respond;

    constructor(method: Method, url: string, headers?: {}, body?: string) {
        this.instruction = {
            name: "http",
            kind: "execute",
            parameters: {
                method,
                url,
                config: {
                    headers,
                    body,
                },
            },
        };
    }
}

export class HttpGet extends HttpRequest {

    constructor(url: string, headers?: {}, body?: any) {
        super("get", url, headers, body);
    }

}

export class HttpPost extends HttpRequest {

    constructor(url: string, headers?: {}, body?: any) {
        super("post", url, headers, body);
    }

}
