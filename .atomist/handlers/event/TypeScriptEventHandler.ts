import { HandleEvent, Message } from '@atomist/rug/operations/Handlers';
import { GraphNode, Match, PathExpression } from '@atomist/rug/tree/PathExpression';
import { EventHandler, Tags } from '@atomist/rug/operations/Decorators';

/**
 * A sample TypeScript event handler used by AddTypeScriptEventHandler.
 */
@EventHandler("TypeScriptEventHandler", "sample TypeScript event handler used by AddTypeScriptEventHandler", "/Tag()")
@Tags("documentation")
export class TypeScriptEventHandler implements HandleEvent<GraphNode, GraphNode> {
    handle(event: Match<GraphNode, GraphNode>): Message {
        let message = new Message("Tag event!");
        return message.withNode(event.root());
    }
}

export const typeScriptEventHandler = new TypeScriptEventHandler();
