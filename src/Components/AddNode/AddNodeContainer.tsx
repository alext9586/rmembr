import * as React from 'react';
import SimpleCard from '../SimpleCard/SimpleCard';
import AddNodeForm from './AddNodeForm';
import { Button } from '@material-ui/core';

import "./AddNode.css";

interface IAddNodeContainerProps {

}

export default class AddNodeContainer extends React.Component<IAddNodeContainerProps, {}> {
    constructor(props: IAddNodeContainerProps) {
        super(props);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    private handleSaveClick(): void {
        alert("hello");
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
                <AddNodeForm />
            </SimpleCard>
        );
    }
}