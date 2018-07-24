import * as React from 'react';
import SimpleCard from '../SimpleCard/SimpleCard';
import AddNodeForm from './AddNodeForm';
import { Button } from '@material-ui/core';

import "./AddNode.css";
import { INodeService, NodeService } from '../../Services/NodeService';

interface IAddNodeContainerState {
    title: string;
    notes: string;
}

interface IAddNodeContainerProps {

}

export default class AddNodeContainer extends React.Component<IAddNodeContainerProps, IAddNodeContainerState> {
    private nodeService: INodeService = new NodeService();

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

    private actions(): JSX.Element {
        return (
            <div className="add-node-action-bar">
                <Button
                    variant="contained"
                    size="small"
                    onClick={this.handleSaveClick}>Cancel</Button>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={this.handleSaveClick}>Save</Button>
            </div>
        );
    }

    render(): JSX.Element {
        return (
            <SimpleCard title="Add Node" actions={this.actions()}>
                <AddNodeForm
                    onTitleBlur={this.onTitleBlur}
                    onNotesBlur={this.onNotesBlur}
                />
            </SimpleCard>
        );
    }
}