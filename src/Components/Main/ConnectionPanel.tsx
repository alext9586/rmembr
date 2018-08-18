import * as React from 'react';
import { Node, Connection, PanelModifyState } from "../../Models";
import { IMainPanelProps } from './IMainPanelProps';
import AddConnectionCard from '../AddConnection/AddConnectionCard';

export default class ConnectionPanel extends React.Component<IMainPanelProps, {}> {

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
                        mode={PanelModifyState.Add}
                        nodes={nodes}
                        parentNode={selectedNode}
                        onCancelClick={onCancelClick}
                        onSaveClick={this.onAddSaveClick}
                    ></AddConnectionCard>
                    : null
                }
                {showEditState
                    ?
                    <AddConnectionCard
                        mode={PanelModifyState.Edit}
                        connection={selectedConnection}
                        nodes={nodes}
                        parentNode={selectedNode}
                        onCancelClick={onCancelClick}
                        onSaveClick={this.onEditSaveClick}
                    ></AddConnectionCard>
                    : null
                }
            </div>
        );
    }
}