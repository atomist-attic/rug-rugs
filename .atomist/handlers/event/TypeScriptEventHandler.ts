import { HandleEvent, DirectedMessage, ChannelAddress, Plan } from '@atomist/rug/operations/Handlers';
import { Match } from '@atomist/rug/tree/PathExpression';
import { EventHandler, Tags } from '@atomist/rug/operations/Decorators';
import { Tag } from "@atomist/cortex/stub/Tag";

/**
 * A sample TypeScript event handler used by AddTypeScriptEventHandler.
 */
@EventHandler("TypeScriptEventHandler", "sample TypeScript event handler used by AddTypeScriptEventHandler", "/Tag()")
@Tags("documentation")
export class TypeScriptEventHandler implements HandleEvent<Tag, Tag> {
    handle(event: Match<Tag, Tag>): Plan {
        let root: Tag = event.root();
        let message = new DirectedMessage(`${root.nodeName()} event: ${root.name}`, new ChannelAddress("general"));
        return Plan.ofMessage(message);
    }
}

export const typeScriptEventHandler = new TypeScriptEventHandler();
