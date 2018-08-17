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

    get isEmpty(): boolean {
        return this.title === "" && this.notes === "";
    }

    addConnection(connection: Connection): void {
        this.connections.push(connection);
    }

    getConnection(connectionId: string): Connection {
        let found = this.connections.filter(c => c._id === connectionId);

        if (found.length > 0) {
            let connection = found[0];
            return new Connection(connection._id, connection.nextId, connection.title, connection.notes);
        } else {
            return new Connection();
        }
    }

    getAllConnections(): Connection[] {
        return this.connections;
    }

    removeConnection(connectionId: string): void {
        this.connections = this.connections.filter(c => c._id !== connectionId);
    }

    removeConnectionToNode(nodeId: string): void {
        this.connections = this.connections.filter(c => c.nextId !== nodeId);
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