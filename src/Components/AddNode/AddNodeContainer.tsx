import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import SimpleCard from '../SimpleCard/SimpleCard';
import AddNodeForm from './AddNodeForm';
import { Button } from '@material-ui/core';

import "./AddNode.css";
import Dependencies from '../../Services/Dependencies';

const styles = ({ spacing }: Theme) => createStyles({
    button: {
        margin: spacing.unit,
    },
    input: {
        display: 'none',
    },
});

interface IAddNodeContainerState {
    title: string;
    notes: string;
}

interface IAddNodeContainerProps extends WithStyles<typeof styles> {

}

class AddNodeContainer extends React.Component<IAddNodeContainerProps, IAddNodeContainerState> {
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

    private actions(): JSX.Element {
        const { classes } = this.props;

        return (
            <div className="add-node-action-bar">
                <Button
                    variant="contained"
                    size="small"
                    className={classes.button}
                    onClick={this.handleSaveClick}>Cancel</Button>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.button}
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

export default withStyles(styles)(AddNodeContainer);