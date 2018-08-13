import * as React from 'react';
import { Node } from "../../Models/Node";
import { Connection } from '../../Models/Connection';
import { PanelModifyState } from '../../Models/PanelModifyState';
import { IMainPanelProps } from './IMainPanelProps';
import AddConnectionCard from '../AddConnection/AddConnectionCard';

export default class AddConnectionPanel extends React.Component<IMainPanelProps, {}> {

    constructor(props: IMainPanelProps) {
        super(props);

        this.onAddSaveClick = this.onAddSaveClick.bind(this);
        this.onEditSaveClick = this.onEditSaveClick.bind(this);
    }

    private onAddSaveClick(connection: Connection): void {
        let selectedNode = this.props.selectedNode;
        selectedNode.addConnection(connection);
        this.save(selectedNode);
    }

    private onEditSaveClick(connection: Connection): void {
        let selectedNode = this.props.selectedNode;
        selectedNode.updateConnection(connection);
        this.save(selectedNode);
    }

    private save(selectedNode: Node): void {
        this.props.nodeService.updateNode(selectedNode);
        this.props.onSaveClick(selectedNode);
    }

    render(): JSX.Element {
        const { displayState, nodeService, selectedNode, selectedConnection, onCancelClick } = this.props;
        const nodes = nodeService.getNodes();

        const showAddState = displayState === PanelModifyState.Add;
        const showEditState = displayState === PanelModifyState.Edit;

        return (
            <div>
                {showAddState
                    ?
                    <AddConnectionCard
                        nodes={nodes}
                        selectedNode={selectedNode}
                        onCancelClick={onCancelClick}
                        onSaveClick={this.onAddSaveClick}
                    ></AddConnectionCard>
                    : null
                }
                {showEditState
                    ?
                    <AddConnectionCard
                        connection={selectedConnection}
                        nodes={nodes}
                        selectedNode={selectedNode}
                        onCancelClick={onCancelClick}
                        onSaveClick={this.onEditSaveClick}
                    ></AddConnectionCard>
                    : null
                    }
            </div>
        );
    }
}