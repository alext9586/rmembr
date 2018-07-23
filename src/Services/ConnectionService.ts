import { v4 as uuid } from 'uuid';
import { Connection } from "../Models/Connection";

export interface IConnectionService {
    addConnection(currentNodeId: string, nextNodeId: string): void;
    getConnections(currentNodeId: string): Connection[];
}

export class ConnectionService implements IConnectionService {
    private connections: Connection[] = [];

    constructor() {

    }

    addConnection(currentNodeId: string, nextNodeId: string): void {
        this.connections.push(new Connection(uuid(), currentNodeId, nextNodeId));
    }

    getConnections(currentNodeId: string): Connection[] {
        return this.connections.filter(x => x.nodeId === currentNodeId);
    }
}