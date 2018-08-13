import { INodeService } from '../../Services/NodeService';
import { Node } from "../../Models/Node";
import { Connection } from '../../Models/Connection';
import { PanelModifyState } from '../../Models/PanelModifyState';

export interface IMainPanelProps {
    displayState: PanelModifyState,
    nodeService: INodeService,
    selectedNode: Node,
    selectedConnection: Connection,
    onSaveClick: (node: Node) => void;
    onCancelClick: () => void;
}