import { Node } from "./Node"
import { Connection } from "./Connection"

export class DisplayNode extends Node {
    constructor(
        node: Node,
        public connections: Connection[]
    ) {
        super(node.id, node.title, node.notes);
    }
}