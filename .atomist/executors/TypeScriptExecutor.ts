import { Executor } from "@atomist/rug/operations/Executor"
import { Services } from "@atomist/rug/model/Core"
import { Result, Status, Parameter } from "@atomist/rug/operations/RugOperation"

interface Parameters {
}

let typeScriptExecutor: Executor = {
    description: "Sample TypeScript Executor",
    name: "TypeScriptExecutor",
    tags: ["atomist/intent=do something"],
    parameters: [],
    execute(services: Services, p: Parameters): Result {

        return new Result(Status.Success, "OK");
    }
}
