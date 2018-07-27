import * as React from 'react';
import SimpleCard from '../SimpleCard/SimpleCard';
import ConnectionsList from './ConnectionsList';
import TitleNotesForm from '../TitleNotesForm/TitleNotesForm';
import CancelSaveActions from '../SimpleCard/CancelSaveActions';
import { Node } from '../../Models/Node';

interface IAddNodeCardState {
    node: Node;
}

interface IAddNodeCardProps {
    node?: Node;
    onConnectionClick: (connectionId: String) => void;
    onCancelClick: () => void;
    onSaveClick: (node: Node) => void;
}

export default class AddNodeCard extends React.Component<IAddNodeCardProps, IAddNodeCardState> {
    constructor(props: IAddNodeCardProps) {
        super(props);

        this.state = {
            node: this.props.node || new Node()
        };

        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.onNotesBlur = this.onNotesBlur.bind(this);
        this.handleConnectionDelete = this.handleConnectionDelete.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    private onTitleBlur(event: any): void {
        var node = this.state.node;
        node.title = event.target.value;

        this.setState(
            {
                node: node
            }
        );
    }

    private onNotesBlur(event: any): void {
        var node = this.state.node;
        node.notes = event.target.value;

        this.setState(
            {
                node: node
            }
        );
    }

    private handleConnectionDelete(id: string): void {
        console.log(id);
    }

    private handleSaveClick(): void {
        const node = this.state.node;
        this.props.onSaveClick(node);
    }

    render(): JSX.Element {
        const { onConnectionClick, onCancelClick } = this.props;
        const actions = (
            <CancelSaveActions
                onCancelClick={onCancelClick}
                onSaveClick={this.handleSaveClick} />
        );

        // Check if it was even passed in
        const cardTitle = this.props.node ? "Edit Node" : "Add Node";

        const node = this.state.node;
        const connections = node ? node.getAllConnections() : [];

        return (
            <SimpleCard title={cardTitle} actions={actions}>
                <TitleNotesForm
                    title={node.title}
                    notes={node.notes}
                    onTitleBlur={this.onTitleBlur}
                    onNotesBlur={this.onNotesBlur}
                />
                <ConnectionsList
                    connections={connections}
                    onClick={onConnectionClick}
                    onDeleteClick={this.handleConnectionDelete}
                />
            </SimpleCard>
        );
    }
}
