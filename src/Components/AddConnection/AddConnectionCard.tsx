import * as React from 'react';
import SimpleCard from '../SimpleCard/SimpleCard';
import CancelSaveActions from '../SimpleCard/CancelSaveActions';
import NodeSelectionList from './NodeSelectionList';
import { Connection } from '../../Models/Connection';
import { Node } from '../../Models/Node';

interface IAddConnectionCardState {
    connection: Connection;
}

interface IAddConnectionCardProps {
    connection: Connection;
    nodes: Node[];
    selectedNode: Node;
    onCancelClick: () => void;
    onSaveClick: (connection: Connection) => void;
}

export default class AddConnectionCard extends React.Component<IAddConnectionCardProps, IAddConnectionCardState> {
    constructor(props: IAddConnectionCardProps) {
        super(props);

        this.state = {
            connection: this.props.connection
        };

        this.handleNodeSelect = this.handleNodeSelect.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    private handleNodeSelect(id: string, title: string): void {
        var connection = this.state.connection;
        connection.title = title;
        connection.nextId = id;

        this.setState({
            connection: connection
        });
    }

    private handleSaveClick(): void {
        const connection = this.state.connection;
        this.props.onSaveClick(connection);
    }

    render(): JSX.Element {
        const { nodes, selectedNode, onCancelClick } = this.props;
        const { title, notes } = this.state.connection;
        const actions = (
            <CancelSaveActions
                onCancelClick={onCancelClick}
                onSaveClick={this.handleSaveClick} />
        );

        // Check if it was even passed in
        const cardTitle = this.props.connection ? "Edit Connection" : "Add Connection"

        return (
            <SimpleCard
                title={cardTitle}
                actions={actions}
                onClose={onCancelClick}>
                <NodeSelectionList
                    nodes={nodes}
                    selectedNode={selectedNode}
                    onChange={this.handleNodeSelect} />
            </SimpleCard>
        );
    }
}
