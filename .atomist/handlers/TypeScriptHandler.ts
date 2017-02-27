import { Atomist } from '@atomist/rug/operations/Handler'
import { TreeNode } from '@atomist/rug/tree/PathExpression'

declare var atomist: Atomist

atomist.on<TreeNode, TreeNode>("/Tag()", m => {
    let information = m.root()
    atomist.messageBuilder().regarding(information).send()
})
