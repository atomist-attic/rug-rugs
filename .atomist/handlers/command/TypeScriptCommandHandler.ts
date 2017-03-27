import { HandleCommand, HandlerContext, Message, Plan } from '@atomist/rug/operations/Handlers';
import { CommandHandler, Parameter, Tags, Intent } from '@atomist/rug/operations/Decorators';
import { Pattern } from '@atomist/rug/operations/RugOperation';

/**
 * A sample TypeScript command handler used by AddTypeScriptCommandHandler.
 */
@CommandHandler("TypeScriptCommandHandler", "sample TypeScript command handler used by AddTypeScriptCommandHandler")
@Tags("documentation")
@Intent("run TypeScriptCommandHandler")
export class TypeScriptCommandHandler implements HandleCommand {

    @Parameter({
        displayName: "Some Input",
        description: "example of how to specify a parameter using decorators",
        pattern: Pattern.any,
        validInput: "a description of the valid input",
        minLength: 1,
        maxLength: 100,
        required: false
    })
    inputParameter: string = "default value";

    handle(command: HandlerContext): Plan {
        let plan: Plan = new Plan();
        let message: Message = new Message(`Successfully ran TypeScriptCommandHandler: ${this.inputParameter}`);
        return plan.add(message);
    }
}

export const typeScriptCommandHandler = new TypeScriptCommandHandler();
