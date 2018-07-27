import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography } from '@material-ui/core';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Add } from '@material-ui/icons';

const styles = ({ spacing }: Theme) => createStyles({
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

interface IMainToolbarProps extends WithStyles<typeof styles> {
    onAddClick: () => void;
}

class MainToolbar extends React.Component<IMainToolbarProps, {}> {
    constructor(props: IMainToolbarProps) {
        super(props);
    }

    render(): JSX.Element {
        const { classes, onAddClick } = this.props;

        return (
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        align="left"
                        variant="title"
                        color="inherit"
                        className={classes.flex}>
                        Rmembr
                        </Typography>
                    <IconButton
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="Menu"
                        onClick={e => onAddClick()}>
                        <Add />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(MainToolbar);