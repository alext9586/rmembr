import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Connection } from '../../Models/Connection';
import { Button, Toolbar, Typography, IconButton } from '@material-ui/core';
import { IConnectionRowClickHandlers } from './ConnectionRow';
import ConnectionList from './ConnectionList';
import AddIcon from '@material-ui/icons/Add';

const styles = ({ palette, spacing }: Theme) => createStyles({
    root: {
        width: '100%',
        backgroundColor: palette.background.paper,
    },
    flex: {
        flexGrow: 1,
    },
    button: {
        margin: spacing.unit,
    },
    input: {
        display: 'none',
    },
});

export interface IConnectionPanelClickHandlers extends IConnectionRowClickHandlers {
    add: () => {}
}

interface IConnectionPanelState {
    
}

interface IConnectionPanelProp extends WithStyles<typeof styles> {
    connections: Connection[];
    onClickHandlers: IConnectionPanelClickHandlers;
}

class ConnectionPanel extends React.Component<IConnectionPanelProp, IConnectionPanelState> {
    constructor(props: IConnectionPanelProp) {
        super(props);
    }

    render(): JSX.Element {
        const { classes, connections, onClickHandlers } = this.props;

        return (
            <div className={classes.root}>
                <Toolbar variant="dense" disableGutters={true}>
                    <Typography variant="title" color="inherit" className={classes.flex}>
                        Connections
                    </Typography>
                    <IconButton
                        color="inherit"
                        aria-label="Add Connection"
                        onClick={e => onClickHandlers.add()}>
                        <AddIcon />
                    </IconButton>
                </Toolbar>
                <ConnectionList
                    connections={connections}
                    onClickHandlers={onClickHandlers}>
                </ConnectionList>
            </div>
        );
    }
}

export default withStyles(styles)(ConnectionPanel);