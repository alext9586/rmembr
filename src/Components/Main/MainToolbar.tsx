import * as React from 'react';
import { AppBar, Toolbar, Typography } from '@material-ui/core';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';

const styles = ({ spacing }: Theme) => createStyles({
    flex: {
        flexGrow: 1,
    },
});

interface IMainToolbarProps extends WithStyles<typeof styles> {
}

class MainToolbar extends React.Component<IMainToolbarProps, {}> {
    constructor(props: IMainToolbarProps) {
        super(props);
    }

    render(): JSX.Element {
        const { classes } = this.props;

        return (
            <AppBar position="fixed">
                <Toolbar>
                    <Typography
                        align="left"
                        variant="title"
                        color="inherit"
                        className={classes.flex}>
                        Rmembr
                        </Typography>
                </Toolbar>
            </AppBar>
        );
    }
}

export default withStyles(styles)(MainToolbar);