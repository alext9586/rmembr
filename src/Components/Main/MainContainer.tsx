import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import AddNodeContainer from '../AddNode/AddNodeContainer';
import NodeDrawerContainer from '../NodeDrawer/NodeDrawerContainer';
import Dependencies from '../../Services/Dependencies';
import { Node } from "../../Models/Node";
import { SampleNodes } from '../../Models/SampleNodes';

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

interface IMainContainerState {
    nodes: Node[]
}

interface IMainContainerProps extends WithStyles<typeof styles> {

}

class MainContainer extends React.Component<IMainContainerProps, IMainContainerState> {
    private nodeService = Dependencies.nodeService;
    private sampleNodes = SampleNodes.create(4);

    constructor(props: IMainContainerProps) {
        super(props);

        this.state = {
            nodes: []
        };

        this.nodeService.initWait().then(x => {
            this.setState({
                nodes: this.nodeService.getNodes()
            });
        });
    }

    render(): JSX.Element {
        const nodes = this.state.nodes;

        if (nodes.length > 0) {
            return (
                <NodeDrawerContainer nodes={nodes}>
                    <AddNodeContainer />
                </NodeDrawerContainer>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default withStyles(styles)(MainContainer);