import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import NodeListContainer from '../NodeList/NodeListContainer';
import AddNodeContainer from '../AddNode/AddNodeContainer';

const drawerWidth = 240;

const styles = ({ zIndex, palette, spacing, mixins }: Theme) => createStyles({
    root: {
        flexGrow: 1,
        height: 430,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        backgroundColor: palette.background.default,
        padding: spacing.unit * 3,
        minWidth: 0, // So the Typography noWrap works
    },
    toolbar: mixins.toolbar,
});

interface IMainContainerProps extends WithStyles<typeof styles> {

}

class MainContainer extends React.Component<IMainContainerProps, {}> {
    constructor(props: IMainContainerProps) {
        super(props);
    }

    render(): JSX.Element {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <div className={classes.toolbar} />
                    <NodeListContainer />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <AddNodeContainer />
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(MainContainer);