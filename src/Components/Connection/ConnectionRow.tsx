import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Connection } from '../../Models/Connection';
import { ListItemSecondaryAction, IconButton } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = ({ palette, spacing }: Theme) => createStyles({
    root: {
        width: '100%',
        backgroundColor: palette.background.paper,
    },
    button: {
        margin: spacing.unit,
    },
    input: {
        display: 'none',
    },
});

export interface IConnectionRowClickHandlers {
    connection: (connectionId: string) => void;
    edit: (connectionId: string) => void;
    delete: (connectionId: string) => void;
}

interface IConnectionRowState {

}

interface IConnectionRowProp extends WithStyles<typeof styles> {
    connection: Connection;
    onClickHandlers: IConnectionRowClickHandlers;
}

class ConnectionRow extends React.Component<IConnectionRowProp, IConnectionRowState> {
    constructor(props: IConnectionRowProp) {
        super(props);
    }

    render(): JSX.Element {
        const { connection, onClickHandlers } = this.props;

        return (
            <ListItem button
                key={connection._id}
                onClick={e => onClickHandlers.connection(connection._id)}>
                <ListItemText primary={connection.title} secondary={connection.notes} />
                <ListItemSecondaryAction>
                    <IconButton aria-label="Edit" onClick={e => onClickHandlers.edit(connection._id)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="Delete" onClick={e => onClickHandlers.delete(connection._id)}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default withStyles(styles)(ConnectionRow);