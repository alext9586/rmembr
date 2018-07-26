import * as React from 'react';
import SimpleCard from '../SimpleCard/SimpleCard';
import ConnectionsList from './ConnectionsList';
import AddNodeForm from './AddNodeForm';
import AddNodeActions from './AddNodeActions';
import { Node } from '../../Models/Node';

interface IAddNodeCardState {
    title: string;
    notes: string;
}

interface IAddNodeCardProps {
    node?: Node;
    onCancelClick: (event: any) => void;
    onSaveClick: (node: Node) => void;
}

export default class AddNodeCard extends React.Component<IAddNodeCardProps, IAddNodeCardState> {
    constructor(props: IAddNodeCardProps) {
        super(props);

        this.state = {
            title: this.props.node ? this.props.node.title : "",
            notes: this.props.node ? this.props.node.notes : ""
        };

        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.onNotesBlur = this.onNotesBlur.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    private onTitleBlur(event: any): void {
        this.setState(
            {
                title: event.target.value,
                notes: this.state.notes
            }
        );
    }

    private onNotesBlur(event: any): void {
        this.setState(
            {
                title: this.state.title,
                notes: event.target.value
            }
        );
    }

    private handleSaveClick(): void {
        var node = this.props.node || new Node();
        node.title = this.state.title;
        node.notes = this.state.notes;
        this.props.onSaveClick(node);
    }

    render(): JSX.Element {
        const { onCancelClick } = this.props;
        const actions = (
            <AddNodeActions
                onCancelClick={onCancelClick}
                onSaveClick={this.handleSaveClick} />
        );

        const title = this.props.node ? "Edit Node" : "Add Node";
        const node = this.props.node;
        const connections = node ? node.getAllConnections() : [];

        return (
            <SimpleCard title={title} actions={actions}>
                <AddNodeForm
                    node={node}
                    onTitleBlur={this.onTitleBlur}
                    onNotesBlur={this.onNotesBlur}
                />
                <ConnectionsList connections={connections} />
            </SimpleCard>
        );
    }
}
