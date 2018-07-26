import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import NodeList from './NodeList';
import { Node } from "../../Models/Node";

const drawerWidth = 240;

const styles = ({ zIndex, palette, spacing, mixins }: Theme) => createStyles({
    root: {
        flexGrow: 1,
        zIndex: 1,
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

interface INodeDrawerContainerState {
    
}

interface INodeDrawerContainerProps extends WithStyles<typeof styles> {
    nodes: Node[];
}

class NodeDrawerContainer extends React.Component<INodeDrawerContainerProps, INodeDrawerContainerState> {
    constructor(props: INodeDrawerContainerProps) {
        super(props);
    }

    render(): JSX.Element {
        const { classes, nodes } = this.props;

        return (
            <div className={classes.root}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <div className={classes.toolbar} />
                    <NodeList nodes={nodes} />
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(NodeDrawerContainer);