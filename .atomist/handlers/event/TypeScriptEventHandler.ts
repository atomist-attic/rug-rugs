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

import { EventHandler, Tags } from "@atomist/rug/operations/Decorators";
import { ChannelAddress, DirectedMessage, EventPlan, HandleEvent } from "@atomist/rug/operations/Handlers";
import { Match } from "@atomist/rug/tree/PathExpression";

import { Tag } from "@atomist/cortex/Tag";

/**
 * A sample TypeScript event handler used by AddTypeScriptEventHandler.
 */
@EventHandler("TypeScriptEventHandler", "sample TypeScript event handler used by AddTypeScriptEventHandler", "/Tag()")
@Tags("documentation")
export class TypeScriptEventHandler implements HandleEvent<Tag, Tag> {
    public handle(event: Match<Tag, Tag>): EventPlan {
        const root: Tag = event.root;
        const message = new DirectedMessage(`${root.nodeName()} event received`, new ChannelAddress("#general"));
        return EventPlan.ofMessage(message);
    }
}

export const typeScriptEventHandler = new TypeScriptEventHandler();
