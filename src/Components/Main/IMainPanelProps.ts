import { INodeService } from '../../Services/NodeService';
import { Node, Connection, PanelModifyState } from "../../Models";

export interface IMainPanelProps {
    displayState: PanelModifyState,
    nodeService: INodeService,
    selectedNode: Node,
    selectedConnection: Connection,
    onSaveClick: (node: Node) => void;
    onCancelClick: () => void;
}