import * as React from 'react';
import { Node, Connection, PanelModifyState } from "../../Models";
import SimpleCard from '../SimpleCard/SimpleCard';
import CancelSaveActions from '../SimpleCard/CancelSaveActions';
import NodeSelectionList from './NodeSelectionList';
import ConnectionNotesForm from '../Forms/ConnectionNotesForm';

interface IAddConnectionCardState {
    connection: Connection;
    selectedNode: Node;
}

interface IAddConnectionCardProps {
    mode: PanelModifyState;
    connection?: Connection;
    nodes: Node[];
    parentNode: Node;
    onCancelClick: () => void;
    onSaveClick: (connection: Connection) => void;
}

export default class AddConnectionCard extends React.Component<IAddConnectionCardProps, IAddConnectionCardState> {
    private emptyNode = new Node();
    private selectableNodes: Node[];

    private get isEditMode(): boolean {
        return this.props.mode == PanelModifyState.Edit;
    }

    constructor(props: IAddConnectionCardProps) {
        super(props);

        let selectedNode = this.props.connection
            ? this.getSelectedNode(this.props.connection.nextId)
            : this.emptyNode;

        this.state = {
            connection: this.props.connection || new Connection(),
            selectedNode: selectedNode
        };

        this.selectableNodes = this.props.nodes
            .filter(node => node._id !== this.props.parentNode._id);

        this.handleNotesBlur = this.handleNotesBlur.bind(this);
        this.handleNodeSelect = this.handleNodeSelect.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    private getSelectedNode(id: string): Node {
        let selectedNode = this.props.nodes.filter(n => n._id === id);
        return selectedNode.length ? selectedNode[0] : this.emptyNode;
    } 

    private handleNotesBlur(event: any): void {
        let connection = this.state.connection;
        connection.notes = event.target.value;

        this.setState({
            connection: connection
        });
    }

    private handleNodeSelect(id: string, title: string): void {
        let connection = this.state.connection;
        connection.title = title;
        connection.nextId = id;
        
        let selectedNode = this.getSelectedNode(id);

        this.setState({
            connection: connection,
            selectedNode: selectedNode
        });
    }

    private handleSaveClick(): void {
        if (!this.state.selectedNode.isEmpty) {
            let connection = this.state.connection;
            this.props.onSaveClick(connection);
        }
    }

    render(): JSX.Element {
        const { onCancelClick } = this.props;
        const { selectedNode, connection } = this.state;

        const actions = (
            <CancelSaveActions
                onCancelClick={onCancelClick}
                onSaveClick={this.handleSaveClick} />
        );

        // Check if it was even passed in
        const cardTitle = this.isEditMode ? "Edit Connection" : "Add Connection";

        return (
            <SimpleCard
                title={cardTitle}
                actions={actions}
                onClose={onCancelClick}>
                <NodeSelectionList
                    nodes={this.selectableNodes}
                    selectedNode={selectedNode}
                    onChange={this.handleNodeSelect} />
                <ConnectionNotesForm
                    notes={connection.notes}
                    onNotesBlur={this.handleNotesBlur} />
            </SimpleCard>
        );
    }
}
