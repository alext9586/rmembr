import * as React from 'react';
import { Node } from "../../Models";
import SimpleCard from '../SimpleCard/SimpleCard';
import TitleNotesForm from '../Forms/TitleNotesForm';
import CancelSaveActions from '../SimpleCard/CancelSaveActions';

interface IAddNodeCardState {
    node: Node;
    disableSave: boolean;
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
            node: this.props.node || new Node(),
            disableSave: true
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.onNotesBlur = this.onNotesBlur.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    private onTitleChange(title: string): void {
        this.setState({
            disableSave: title === ""
        })
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
                onSaveClick={this.handleSaveClick}
                saveDisabled={this.state.disableSave}/>
        );

        // Check if it was even passed in
        const cardTitle = this.props.node ? "Edit Node" : "Add Node";

        const node = this.state.node;

        return (
            <SimpleCard
                title={cardTitle}
                actions={actions}
                onClose={onCancelClick}>
                <TitleNotesForm
                    title={node.title}
                    notes={node.notes}
                    onTitleChange={this.onTitleChange}
                    onTitleBlur={this.onTitleBlur}
                    onNotesBlur={this.onNotesBlur}
                />                
            </SimpleCard>
        );
    }
}
