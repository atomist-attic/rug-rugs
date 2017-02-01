import { Executor } from "@atomist/rug/operations/Executor"
import { Services } from "@atomist/rug/model/Core"
import { Result, Status, Parameter } from "@atomist/rug/operations/RugOperation"

interface Parameters {
}

var defaultExecutor: Executor = {
    description: "Default Executor",
    name: "DefaultExecutor",
    tags: ["atomist/intent=do something"],
    parameters: [],
    execute(services: Services, p: Parameters): Result {

        return new Result(Status.Success, "OK");
    }
}
