import PouchDB from "pouchdb";
import { INode, Node } from "../Models/Node";

// https://www.bennadel.com/blog/3194-experimenting-with-simple-crud-operations-using-pouchdb-in-angular-2-1-1.htm

interface IPouchDbGetNodesResult extends PouchDB.Core.ExistingDocument<PouchDB.Core.AllDocsMeta> {
    title?: string;
    notes?: string;
}

export class DbService {
    private db = new PouchDB("rmembr", { auto_compaction: true });

    constructor() {
        
    }

    public addNode(node: Node): Promise<string> {
        var promise = this.db
            .put(node)
            .then(result => result.id);
        
        return (promise);
    }

    public getNodes(): Promise<Node[]> {
        var promise = this.db
            .allDocs({
                include_docs: true
            })
            .then(result => {
                return result.rows.map(row => {
                    var doc: IPouchDbGetNodesResult = row.doc;
                    return new Node(doc._id, doc.title, doc.notes);
                })
            })
        
        return (promise);
    }
}