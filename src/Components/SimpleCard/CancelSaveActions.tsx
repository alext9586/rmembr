import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import { ArrowBack, Check } from '@material-ui/icons';

const styles = ({ spacing }: Theme) => createStyles({
    button: {
        margin: spacing.unit,
    },
    input: {
        display: 'none',
    },
});

interface ICancelSaveActionsProps extends WithStyles<typeof styles> {
    onCancelClick: (event: any) => void;
    onSaveClick: (event: any) => void;
    saveDisabled: boolean;
}

class CancelSaveActions extends React.Component<ICancelSaveActionsProps, {}> {
    render(): JSX.Element {
        const { classes, onCancelClick, onSaveClick, saveDisabled } = this.props;

        return (
            <Typography align="right">
                <Button
                    variant="fab"
                    className={classes.button}
                    onClick={onCancelClick}
                    aria-label="Back"><ArrowBack /></Button>
                <Button
                    variant="fab"
                    color="primary"
                    className={classes.button}
                    onClick={onSaveClick}
                    disabled={saveDisabled}
                    aria-label="Save"><Check /></Button>
            </Typography>
        );
    }
}

export default withStyles(styles)(CancelSaveActions);