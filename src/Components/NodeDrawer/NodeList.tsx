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
    nodes: Node[];
    selectedId: string;
    onNodeClick: (id: string) => void;
}

class NodeList extends React.Component<INodeListProps, INodeListState> {
    

    constructor(props: INodeListProps) {
        super(props);
    }

    render(): JSX.Element {
        const { classes, selectedId, onNodeClick } = this.props;

        const listItems = this.props.nodes.map(node => {
            const primaryColor = node._id === selectedId ? "secondary" : "default";
            return (
                <ListItem button
                    key={node._id}
                    onClick={(e) => onNodeClick(node._id)}
                >
                    <ListItemText
                        primary={node.title}
                        secondary={node.notes}
                        primaryTypographyProps={{color: primaryColor}}
                    />
                </ListItem>
            );
        });

        return (
            <div className={classes.root}>
                <List component="ul">
                    {listItems}
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(NodeList);