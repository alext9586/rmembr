import * as React from 'react';
import NodeCard from "../NodeDrawer/NodeCard";
import { Node } from "../../Models";
import { IConnectionPanelClickHandlers } from '../Connection/ConnectionPanel';
import { INodeService } from '../../Services/NodeService';
import DeleteConfirmationDialog from '../Common/DeleteConfirmationDialog';

interface INodeViewPanelProps {
    nodeService: INodeService;
    selectedNode: Node;
    connectionClickHandlers: IConnectionPanelClickHandlers;
    onDeleteClick: () => void;
    onEditClick: (node: Node) => void;
    onCloseClick: () => void;
}

interface INodeViewPanelState {
    warnDialogOpen: boolean
}

export default class NodeViewPanel extends React.Component<INodeViewPanelProps, INodeViewPanelState> {
    constructor(props: INodeViewPanelProps) {
        super(props);

        this.state = {
            warnDialogOpen: false
        }

        this.onDeleteWarn = this.onDeleteWarn.bind(this);
        this.onDeleteWarnClose = this.onDeleteWarnClose.bind(this);
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
    }

    private onDeleteWarn(event: any): void {
        this.setState({
            warnDialogOpen: true
        });
    }

    private onDeleteWarnClose(): void {
        this.setState({
            warnDialogOpen: false
        })
    }

    private onDeleteConfirm(): void {
        this.props.nodeService.deleteNode(this.props.selectedNode._id);
        this.props.onDeleteClick();
    }

    render(): JSX.Element {
        const { selectedNode, onEditClick, onCloseClick, connectionClickHandlers } = this.props;
        
        return (
            <div>
                <NodeCard
                    node={selectedNode}
                    connectionClickHandlers={connectionClickHandlers}
                    onDeleteClick={this.onDeleteWarn}
                    onEditClick={onEditClick}
                    onCloseClick={onCloseClick}
                />
                <DeleteConfirmationDialog
                    open={this.state.warnDialogOpen}
                    onClose={this.onDeleteWarnClose}
                    onDelete={this.onDeleteConfirm}
                    title="Delete Node?"
                    body="Are you sure you want to delete this node?"
                />
            </div>
        );
    }
}