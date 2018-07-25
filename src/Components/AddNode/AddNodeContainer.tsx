import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import SimpleCard from '../SimpleCard/SimpleCard';
import AddNodeForm from './AddNodeForm';
import AddNodeActions from './AddNodeActions';
import Dependencies from '../../Services/Dependencies';

import "./AddNode.css";

interface IAddNodeContainerState {
    title: string;
    notes: string;
}

interface IAddNodeContainerProps {

}

export default class AddNodeContainer extends React.Component<IAddNodeContainerProps, IAddNodeContainerState> {
    private nodeService = Dependencies.nodeService;

    constructor(props: IAddNodeContainerProps) {
        super(props);

        this.state = {
            title: "",
            notes: ""
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
        this.nodeService.addNode(this.state.title, this.state.notes);
    }

    render(): JSX.Element {
        const actions = (
            <AddNodeActions
                onCancelClick={this.handleSaveClick}
                onSaveClick={this.handleSaveClick} />
        );

        return (
            <SimpleCard title="Add Node" actions={actions}>
                <AddNodeForm
                    onTitleBlur={this.onTitleBlur}
                    onNotesBlur={this.onNotesBlur}
                />
            </SimpleCard>
        );
    }
}
