import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Node } from "../../Models/Node";
import SimpleCard from '../SimpleCard/SimpleCard';
import { Edit, Delete } from '@material-ui/icons';

const styles = ({ spacing }: Theme) => createStyles({
    button: {
        margin: spacing.unit,
    },
    input: {
        display: 'none',
    },
});

interface INodeCardProps extends WithStyles<typeof styles> {
    node: Node;
    onDeleteClick: (node: Node) => void;
    onEditClick: (node: Node) => void;
    onCloseClick: () => void;
}

class NodeCard extends React.Component<INodeCardProps, {}> {
    constructor(props: INodeCardProps) {
        super(props);

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    private handleDeleteClick(event: any): void {
        this.props.onDeleteClick(this.props.node);
    }

    private handleEditClick(event: any): void {
        this.props.onEditClick(this.props.node);
    }

    private renderActions(): JSX.Element {
        const { classes } = this.props;

        return (
            <Typography align="right">
                <Button
                    variant="fab"
                    color="secondary"
                    className={classes.button}
                    onClick={this.handleDeleteClick}
                    aria-label="Delete"><Delete /></Button>
                <Button
                    variant="fab"
                    color="primary"
                    className={classes.button}
                    onClick={this.handleEditClick}
                    aria-label="Edit"><Edit /></Button>
            </Typography>
        );
    }

    private renderConnections(node: Node): JSX.Element[] {
        const connections = node.getAllConnections();

        return connections.map(c => {
            return (
                <ListItem button key={c._id}>
                    <ListItemText primary={c.title} secondary={c.notes}></ListItemText>
                </ListItem>
            );
         });
    }

    render(): JSX.Element {
        const { node, onCloseClick } = this.props;
        const connections = this.renderConnections(node);
        const actions = this.renderActions();

        return (
            <SimpleCard
                title={node.title}
                actions={actions}
                onClose={onCloseClick}>
                {node.notes}
                <List component="ul">
                    {connections}
                </List>
            </SimpleCard>
        )
    }
}

export default withStyles(styles)(NodeCard);