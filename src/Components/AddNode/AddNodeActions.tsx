import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const styles = ({ spacing }: Theme) => createStyles({
    button: {
        margin: spacing.unit,
    },
    input: {
        display: 'none',
    },
});

interface IAddNodeActionsProps extends WithStyles<typeof styles> {
    onCancelClick: (event: any) => void;
    onSaveClick: (event: any) => void;
}

class AddNodeActions extends React.Component<IAddNodeActionsProps, {}> {
    render(): JSX.Element {
        const { classes, onCancelClick, onSaveClick } = this.props;

        return (
            <div className="add-node-action-bar">
                <Button
                    variant="contained"
                    size="small"
                    className={classes.button}
                    onClick={onCancelClick}>Cancel</Button>
                <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    className={classes.button}
                    onClick={onSaveClick}>Save</Button>
            </div>
        );
    }
}

export default withStyles(styles)(AddNodeActions);