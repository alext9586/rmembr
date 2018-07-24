import { INodeService, NodeService } from "./NodeService";

export default class Dependencies {
    public static nodeService: INodeService = new NodeService();
}