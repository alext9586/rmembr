import { v4 as uuid } from 'uuid';
import { IConnection, Connection } from "./Connection";


export interface INode {
    _id: string;
    _rev: string;
    title: string;
    notes: string;
    connections: IConnection[];
}

export class Node {
    private connections: Connection[] = [];
    private id: string;
    private rev: string;

    get _id(): string {
        return this.id;
    }

    constructor(
        id: string = uuid(),
        public title: string = "",
        public notes: string = ""
    ) {
        this.id = id;
    }

    addConnection(connection: Connection): void {
        this.connections.push(connection);
    }

    getConnection(connectionId: string): Connection {
        var found = this.connections.filter(c => c._id === connectionId);
        return found.length > 0 ? found[0] : new Connection();
    }

    getAllConnections(): Connection[] {
        return this.connections;
    }

    removeConnection(connectionId: string): void {
        this.connections = this.connections.filter(c => c._id !== connectionId);
    }

    update(newNode: Node): void {
        this.title = newNode.title;
        this.notes = newNode.notes;
        this.connections = newNode.getAllConnections();
    }

    updateConnection(connection: Connection): void {
        this.connections.some(c => {
            if (c._id === connection._id) {
                c.update(connection);
                return true;
            }
            return false;
         });
    }

    fromJson(node: INode): void {
        this.id = node._id;
        this.rev = node._rev;
        this.title = node.title;
        this.notes = node.notes;
        this.connections = node.connections.map(c => {
            const temp = new Connection();
            temp.fromJson(c);
            return temp;
        });
    }

    toJson(): INode {
        return {
            _id: this.id,
            _rev: this.rev,
            title: this.title,
            notes: this.notes,
            connections: this.connections.map(c => c.toJson())
        } as INode;
    }
}