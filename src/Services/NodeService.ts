import { v4 as uuid } from 'uuid';
import { Node } from "../Models/Node";
import { IDbService, DbService } from "./DbService";

export interface INodeService {
    addNode(title: string, notes: string): void;
    getNode(id: string): Node;
    updateNode(node: Node): void;
    getNodes(): Node[];
}

export class NodeService implements INodeService {
    private nodes: Node[] = [];
    private dbService: IDbService = new DbService();

    constructor() {
        this.dbService.getNodes().then(result => {
            this.nodes = result;
        });
    }

    addNode(title: string, notes: string): void {
        var newNode = new Node(uuid(), title, notes);
        this.nodes.push(newNode);
        this.dbService.putNode(newNode);
    }

    getNode(id: string): Node {
        var found = this.nodes.filter(x => x._id === id);

        return found.length > 0 ? found[0] : new Node();
    }

    updateNode(node: Node): void {
        this.nodes.some(n => {
            if (n._id === node._id) {
                n.update(node);
                this.dbService.putNode(node);
                return true;
            }
            return false;
        });
    }

    getNodes(): Node[] {
        return this.nodes;
    }
}