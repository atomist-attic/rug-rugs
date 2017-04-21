import { EventHandler, Tags } from "@atomist/rug/operations/Decorators";
import { ChannelAddress, DirectedMessage, HandleEvent, Plan } from "@atomist/rug/operations/Handlers";
import { Match } from "@atomist/rug/tree/PathExpression";

import { Tag } from "@atomist/cortex/Tag";

/**
 * A sample TypeScript event handler used by AddTypeScriptEventHandler.
 */
@EventHandler("TypeScriptEventHandler", "sample TypeScript event handler used by AddTypeScriptEventHandler", "/Tag()")
@Tags("documentation")
export class TypeScriptEventHandler implements HandleEvent<Tag, Tag> {
    public handle(event: Match<Tag, Tag>): Plan {
        const root: Tag = event.root();
        const message = new DirectedMessage(`${root.nodeName()} event received`, new ChannelAddress("#general"));
        return Plan.ofMessage(message);
    }
}

export const typeScriptEventHandler = new TypeScriptEventHandler();
