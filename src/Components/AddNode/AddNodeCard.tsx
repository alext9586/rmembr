import * as React from 'react';
import SimpleCard from '../SimpleCard/SimpleCard';
import TitleNotesForm from '../TitleNotesForm/TitleNotesForm';
import CancelSaveActions from '../SimpleCard/CancelSaveActions';
import { Node } from '../../Models/Node';

interface IAddNodeCardState {
    node: Node;
}

interface IAddNodeCardProps {
    node?: Node;
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

    private handleSaveClick(): void {
        const node = this.state.node;
        this.props.onSaveClick(node);
    }

    render(): JSX.Element {
        const { onCancelClick } = this.props;
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
            <SimpleCard
                title={cardTitle}
                actions={actions}
                onClose={onCancelClick}>
                <TitleNotesForm
                    title={node.title}
                    notes={node.notes}
                    onTitleBlur={this.onTitleBlur}
                    onNotesBlur={this.onNotesBlur}
                />                
            </SimpleCard>
        );
    }
}
