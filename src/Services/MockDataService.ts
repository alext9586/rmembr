import { Node } from "../Models";
import { IDbService } from "./DbService";
import { SampleNodes } from "../Models/SampleNodes";

export class MockDataService implements IDbService {
    private nodes: Node[] = [];

    constructor() {
        this.nodes = SampleNodes.create(4);
    }

    putNode(node: Node): Promise<string> {
        var promise = new Promise<string>((resolve, reject) => {
            var found = this.nodes.some(n => {
                if (n._id === node._id) {
                    n.update(node);
                    return true;
                }
                return false;
            });

            if (!found) {
                this.nodes.push(node);
            }

            resolve(node._id);
        });

        return (promise);
    }

    updateNodes(nodes: Node[]): Promise<Node[]> {
        var promise = new Promise<Node[]>((resolve, reject) => {
            this.nodes = nodes;
            resolve(this.nodes);
        });

        return (promise);
    }

    getNodes(): Promise<Node[]> {
        var promise = new Promise<Node[]>((resolve, reject) => {
            setTimeout(resolve(this.nodes), 1000);
        });
        
        return (promise);
    }
}