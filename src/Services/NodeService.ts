import { v4 as uuid } from 'uuid';
import { Node } from "../Models/Node";

export interface INodeService {

}

export class NodeService implements INodeService {
    private nodes: Node[] = [];

    constructor() {

    }

    addNode(title: string, notes: string): void {
        this.nodes.push(new Node(uuid(), title, notes));
    }

    getNode(id: string): Node {
        var found = this.nodes.filter(x => x.id === id);

        return found.length > 0 ? found[0] : new Node();
    }

    getNodes(): Node[] {
        return this.nodes;
    }
}