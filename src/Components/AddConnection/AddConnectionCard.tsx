import * as React from 'react';
import SimpleCard from '../SimpleCard/SimpleCard';
import CancelSaveActions from '../SimpleCard/CancelSaveActions';
import NodeSelectionList from './NodeSelectionList';
import { Connection } from '../../Models/Connection';
import { Node } from '../../Models/Node';
import ConnectionNotesForm from '../Forms/ConnectionNotesForm';

interface IAddConnectionCardState {
    connection: Connection;
}

interface IAddConnectionCardProps {
    connection?: Connection;
    nodes: Node[];
    selectedNode: Node;
    onCancelClick: () => void;
    onSaveClick: (connection: Connection) => void;
}

export default class AddConnectionCard extends React.Component<IAddConnectionCardProps, IAddConnectionCardState> {
    constructor(props: IAddConnectionCardProps) {
        super(props);

        this.state = {
            connection: this.props.connection || new Connection()
        };

        this.handleNotesBlur = this.handleNotesBlur.bind(this);
        this.handleNodeSelect = this.handleNodeSelect.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
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

        this.setState({
            connection: connection
        });
    }

    private handleSaveClick(): void {
        let connection = this.state.connection;
        this.props.onSaveClick(connection);
    }

    render(): JSX.Element {
        const { nodes, selectedNode, onCancelClick } = this.props;
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
                <ConnectionNotesForm
                    notes={this.state.connection.notes}
                    onNotesBlur={this.handleNotesBlur} />
            </SimpleCard>
        );
    }
}
