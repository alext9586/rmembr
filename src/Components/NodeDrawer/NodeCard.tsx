import * as React from 'react';
import { Node } from "../../Models";
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import SimpleCard from '../SimpleCard/SimpleCard';
import { Edit, Delete } from '@material-ui/icons';
import ConnectionPanel from '../Connection/ConnectionPanel';
import { IConnectionPanelClickHandlers } from '../Connection/ConnectionPanel';

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
    connectionClickHandlers: IConnectionPanelClickHandlers;
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

    render(): JSX.Element {
        const { node, connectionClickHandlers, onCloseClick } = this.props;
        const connections = node.getAllConnections();
        const actions = this.renderActions();

        return (
            <SimpleCard
                title={node.title}
                actions={actions}
                onClose={onCloseClick}>
                {node.notes}
                <ConnectionPanel
                    connections={connections}
                    onClickHandlers={connectionClickHandlers}
                />
            </SimpleCard>
        )
    }
}

export default withStyles(styles)(NodeCard);