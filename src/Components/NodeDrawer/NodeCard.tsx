import * as React from 'react';
import { Node } from "../../Models";
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import SimpleCard from '../SimpleCard/SimpleCard';
import { Edit, Delete } from '@material-ui/icons';
import ConnectionPanel from '../Connection/ConnectionPanel';
import { IConnectionPanelClickHandlers } from '../Connection/ConnectionPanel';
import DeleteConfirmationDialog from '../Common/DeleteConfirmationDialog';
import { INodeService } from '../../Services/NodeService';

const styles = ({ spacing }: Theme) => createStyles({
    button: {
        margin: spacing.unit,
    },
    input: {
        display: 'none',
    },
});

interface INodeCardProps extends WithStyles<typeof styles> {
    nodeService: INodeService;
    node: Node;
    connectionClickHandlers: IConnectionPanelClickHandlers;
    onDeleteClick: () => void;
    onEditClick: (node: Node) => void;
    onCloseClick: () => void;
}

interface INodeCardState {
    warnDialogOpen: boolean;
}

class NodeCard extends React.Component<INodeCardProps, INodeCardState> {
    constructor(props: INodeCardProps) {
        super(props);

        this.state = {
            warnDialogOpen: false
        }

        this.handleDeleteWarn = this.handleDeleteWarn.bind(this);
        this.handleDeleteWarnClose = this.handleDeleteWarnClose.bind(this);
        this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);

        // this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleEditClick = this.handleEditClick.bind(this);
    }

    private handleDeleteWarn(event: any): void {
        this.setState({
            warnDialogOpen: true
        });
    }

    private handleDeleteWarnClose(): void {
        this.setState({
            warnDialogOpen: false
        })
    }

    private handleDeleteConfirm(): void {
        this.props.nodeService.deleteNode(this.props.node._id);
        this.props.onDeleteClick();
    }

    // private handleDeleteClick(event: any): void {
    //     this.props.onDeleteClick(this.props.node);
    // }

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
                    onClick={this.handleDeleteWarn}
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
            <div>
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
            <DeleteConfirmationDialog
                open={this.state.warnDialogOpen}
                onClose={this.handleDeleteWarnClose}
                onDelete={this.handleDeleteConfirm}
                title="Delete Node?"
                body="Are you sure you want to delete this node?"
                />
            </div>
        )
    }
}

export default withStyles(styles)(NodeCard);