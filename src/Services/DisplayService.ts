import { DisplayNode } from "../Models/DisplayNode";
import { Node } from "../Models/Node";
import { Connection } from "../Models/Connection";
import { NodeService } from "./NodeService";
import { ConnectionService } from "./ConnectionService";

export class DisplayService {
    private displayNodes: DisplayNode[] = [];
    
    private nodeService = new NodeService();
    private connectionService = new ConnectionService();

    public get nodes(): DisplayNode[] {
        return this.displayNodes;
    }

    constructor() {
        this.update();
    }

    private update(): void {
        this.displayNodes = this.nodeService.getNodes().map(node => {
            var connections = this.connectionService.getConnections(node.id);
            return new DisplayNode(node, connections);
        });
    }

    addNode(title: string, notes: string): void {
        this.nodeService.addNode(title, notes);
    }

    addConnection(nodeId: string, nextNodeId: string): void {
        this.connectionService.addConnection(nodeId, nextNodeId);
        this.update();
    }
}