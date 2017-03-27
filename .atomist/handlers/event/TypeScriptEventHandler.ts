import { HandleEvent, Message, Plan } from '@atomist/rug/operations/Handlers';
import { GraphNode, Match } from '@atomist/rug/tree/PathExpression';
import { EventHandler, Tags } from '@atomist/rug/operations/Decorators';
import { Tag } from "@atomist/cortex/stub/Tag";

/**
 * A sample TypeScript event handler used by AddTypeScriptEventHandler.
 */
@EventHandler("TypeScriptEventHandler", "sample TypeScript event handler used by AddTypeScriptEventHandler", "/Tag()")
@Tags("documentation")
export class TypeScriptEventHandler implements HandleEvent<Tag, GraphNode> {
    handle(event: Match<Tag, GraphNode>): Plan {
        let root: Tag = event.root();
        let plan: Plan = new Plan();
        let message = new Message(`${root.nodeName()} event: ${root.name()}`);
        message.withNode(root)
        return plan.add(message);
    }
}

export const typeScriptEventHandler = new TypeScriptEventHandler();
