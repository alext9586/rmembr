import * as React from 'react';
import { Node } from "../../Models";
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import NodeList from './NodeList';

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

interface INodeDrawerState {
    
}

interface INodeDrawerProps extends WithStyles<typeof styles> {
    nodes: Node[];
    selectedId: string;
    onNodeClick: (id: string) => void;
}

class NodeDrawer extends React.Component<INodeDrawerProps, INodeDrawerState> {
    constructor(props: INodeDrawerProps) {
        super(props);
    }

    render(): JSX.Element {
        const { classes, nodes, selectedId, onNodeClick } = this.props;

        return (
            <div className={classes.root}>
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classes.drawerPaper,
                    }}>
                    <NodeList
                        nodes={nodes}
                        selectedId={selectedId}
                        onNodeClick={onNodeClick}
                    />
                </Drawer>
                <main className={classes.content}>
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(NodeDrawer);