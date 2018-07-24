import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Dependencies from '../../Services/Dependencies';
import { Node } from "../../Models/Node";

const styles = ({ palette }: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: palette.background.paper,
    },
});

interface INodeListContainerState {
    nodes: Node[];
}

interface INodeListContainerProps extends WithStyles<typeof styles> {

}

class NodeListContainer extends React.Component<INodeListContainerProps, INodeListContainerState> {
    private nodeService = Dependencies.nodeService;

    constructor(props: INodeListContainerProps) {
        super(props);

        this.state = {
            nodes: []
        }

        this.nodeService.initWait().then(x => {
            this.setState({
                nodes: this.nodeService.getNodes()
            });
        });
    }

    render(): JSX.Element {
        const { classes } = this.props;

        const listItems = this.state.nodes.map(node => {
            return (
                <ListItem button>
                    <ListItemText primary={node.title} secondary={node.notes} />
                </ListItem>
            );
        });

        return (
            <div className={classes.root}>
                <List component="nav">
                    {listItems}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(NodeListContainer);