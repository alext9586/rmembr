import { Node } from "../Models/Node";
import { IDbService } from "./DbService";
import { resolve } from "dns";
import { SampleNodes } from "../Models/SampleNodes";

export class MockDataService implements IDbService {
    private nodes: Node[] = [];

    constructor() {
        this.nodes = SampleNodes.create(4);
    }

    putNode(node: Node): Promise<string> {
        var promise = new Promise<string>((resolve, reject) => {
            setTimeout(resolve(node._id), 100);
        });

        return (promise);
    }

    updateNodes(nodes: Node[]): Promise<Node[]> {
        this.nodes = nodes;
        var promise = new Promise<Node[]>((resolve, reject) => {
            setTimeout(resolve(this.nodes), 100);
        });

        return (promise);
    }

    getNodes(): Promise<Node[]> {
        var promise = new Promise<Node[]>((resolve, reject) => {
            setTimeout(resolve(this.nodes), 100);
        });
        
        return (promise);
    }
}