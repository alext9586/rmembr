import PouchDB from "pouchdb";
import { INode, Node } from "../Models/Node";
import { resolve } from "url";

// https://www.bennadel.com/blog/3194-experimenting-with-simple-crud-operations-using-pouchdb-in-angular-2-1-1.htm

export interface IDbService {
    putNode(node: Node): Promise<string>;
    updateNodes(nodes: Node[]): Promise<Node[]>;
    getNodes(): Promise<Node[]>;
}

export class DbService implements IDbService {
    private db = new PouchDB("rmembr", { auto_compaction: true });

    constructor() {
        
    }

    putNode(node: Node): Promise<string> {
        var promise = this.db
            .put(node.toJson())
            .then(result => result.id);
        
        return (promise);
    }

    updateNodes(nodes: Node[]): Promise<Node[]> {
        var promise = this.db
            .bulkDocs(nodes.map(n => n.toJson()))
            .then(result => this.mapResultsToNode(result));
        
        return (promise);
    }

    getNodes(): Promise<Node[]> {
        var promise = this.db
            .allDocs({
                include_docs: true
            })
            .then(result => this.mapResultsToNode(result))
        
        return (promise);
    }

    private mapResultsToNode(result: any): Node[] {
        return result.rows.map(row => {
            var doc: any = row.doc;
            var newNode = new Node();
            newNode.fromJson(doc);
            return newNode;
        });
    }
}