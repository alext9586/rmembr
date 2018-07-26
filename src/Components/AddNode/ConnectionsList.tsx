import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Connection } from '../../Models/Connection';
import { Button, ListItemSecondaryAction, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = ({ palette, spacing }: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: palette.background.paper,
    },
    button: {
        margin: spacing.unit,
    },
    input: {
        display: 'none',
    },
});

interface IConnectionsListState {
    
}

interface IConnectionsListProp extends WithStyles<typeof styles> {
    connections: Connection[];
    onDeleteClick: (connectionId: string) => void;
}

class ConnectionsList extends React.Component<IConnectionsListProp, IConnectionsListState> {
    constructor(props: IConnectionsListProp) {
        super(props);
    }

    render(): JSX.Element {
        const { classes } = this.props;

        const listItems = this.props.connections.map(c => {
            return (
                <ListItem button key={c._id}>
                    <ListItemText primary={c.title} secondary={c.notes} />
                    <ListItemSecondaryAction>
                        <IconButton aria-label="Delete">
                            <DeleteIcon onClick={ (e) => this.props.onDeleteClick(c._id) } />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        });

        return (
            <div className={classes.root}>
                <List component="ul">
                    {listItems}
                </List>
                <Button variant="outlined" color="primary" className={classes.button}>
                    Add Connection
                </Button>
            </div>
        );
    }
}

export default withStyles(styles)(ConnectionsList);