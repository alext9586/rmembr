import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Node } from "../../Models/Node";

const styles = ({ palette }: Theme) => createStyles({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: palette.background.paper,
    },
});

interface INodeListState {

}

interface INodeListProps extends WithStyles<typeof styles> {
    nodes: Node[]
}

class NodeList extends React.Component<INodeListProps, INodeListState> {
    

    constructor(props: INodeListProps) {
        super(props);
    }

    render(): JSX.Element {
        const { classes } = this.props;

        const listItems = this.props.nodes.map(node => {
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

export default withStyles(styles)(NodeList);