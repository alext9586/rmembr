import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, CircularProgress } from '@material-ui/core';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import NodeDrawer from '../NodeDrawer/NodeDrawer';
import Dependencies from '../../Services/Dependencies';
import { Node } from "../../Models/Node";
import { Connection } from '../../Models/Connection';
import NodeCard from "../NodeDrawer/NodeCard";
import AddNodeCard from '../AddNode/AddNodeCard';
import AddConnectionCard from '../AddConnection/AddConnectionCard';
import MainToolbar from './MainToolbar';

const styles = ({ spacing }: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: spacing.unit * 2,
    },
});

interface IMainContainerState {
    nodes: Node[],
    selectedNode: Node,
    selectedConnection: Connection,
    viewState: ViewState
}

interface IMainContainerProps extends WithStyles<typeof styles> {

}

enum ViewState {
    Loading,
    Ready,
    View,
    Add,
    ModifyNode,
    ModifyConnection
}

class MainContainer extends React.Component<IMainContainerProps, IMainContainerState> {
    private nodeService = Dependencies.nodeService;

    constructor(props: IMainContainerProps) {
        super(props);

        this.state = {
            nodes: [],
            selectedNode: new Node(),
            selectedConnection: new Connection(),
            viewState: ViewState.Loading
        };

        this.onNodeCloseClick = this.onNodeCloseClick.bind(this);
        this.onNodeAddClick = this.onNodeAddClick.bind(this);
        this.onNodeClick = this.onNodeClick.bind(this);
        this.onConnectionClick = this.onConnectionClick.bind(this);
        this.onConnectionCancelClick = this.onConnectionCancelClick.bind(this);
        this.onConnectionSaveClick = this.onConnectionSaveClick.bind(this);
        this.onNodeCancelClick = this.onNodeCancelClick.bind(this);
        this.onNodeEditClick = this.onNodeEditClick.bind(this);
        this.onNodeSaveClick = this.onNodeSaveClick.bind(this);
        this.onNodeDeleteClick = this.onNodeDeleteClick.bind(this);

        this.render();

        this.nodeService.initWait().then(x => {
            this.setState({
                nodes: this.nodeService.getNodes(),
                selectedNode: new Node(),
                selectedConnection: new Connection(),
                viewState: ViewState.Ready
            });
        });
    }

    private onConnectionClick(id: string): void {
        const connection = this.state.selectedNode.getConnection(id);
        this.setState({
            selectedConnection: connection,
            viewState: ViewState.ModifyConnection
        });
    }

    private onConnectionCancelClick(): void {
        this.setState({
            selectedConnection: new Connection(),
            viewState: ViewState.ModifyNode
        });
    }

    private onConnectionSaveClick(connection: Connection): void {
        var selectedNode = this.state.selectedNode;
        selectedNode.updateConnection(connection);

        var nodes = this.state.nodes;
        nodes.some(n => {
            if (n._id === this.state.selectedNode._id) {
                n.update(selectedNode);
                return true;
            }
            return false;
        });

        this.setState({
            nodes: nodes,
            selectedNode: selectedNode,
            selectedConnection: new Connection(),
            viewState: ViewState.ModifyNode
        });
    }

    private onNodeClick(id: string): void {
        const found = this.state.nodes.filter(n => n._id === id);
        this.setState({
            selectedNode: found[0],
            selectedConnection: new Connection(),
            viewState: ViewState.View
        });
    }

    private onNodeAddClick(): void {
        this.setState({
            selectedNode: new Node(),
            selectedConnection: new Connection(),
            viewState: ViewState.Add
        });
    }

    private onNodeCancelClick(): void {
        const viewState = (this.state.selectedNode.isEmpty) ? ViewState.Ready : ViewState.View;

        this.setState({
            selectedConnection: new Connection(),
            viewState: viewState
        });
    }

    private onNodeDeleteClick(node: Node): void {
        this.nodeService.deleteNode(node._id);
        this.setState({
            nodes: this.nodeService.getNodes(),
            selectedNode: new Node(),
            selectedConnection: new Connection(),
            viewState: ViewState.Ready
        });
    }

    private onNodeEditClick(node: Node): void {
        this.setState({
            selectedNode: node,
            selectedConnection: new Connection(),
            viewState: ViewState.ModifyNode
        });
    }

    private onNodeSaveClick(node: Node): void {
        this.nodeService.addNode(node);
        const nodes = this.nodeService.getNodes();

        this.setState({
            nodes: nodes,
            selectedNode: node,
            selectedConnection: new Connection(),
            viewState: ViewState.View
        });
    }

    private onNodeCloseClick(): void {
        this.setState({
            selectedNode: new Node(),
            selectedConnection: new Connection(),
            viewState: ViewState.Ready
        });
    }

    renderNodeDrawer(): JSX.Element {
        const nodes = this.state.nodes;
        const { selectedNode, selectedConnection } = this.state;
        const { classes } = this.props;

        const showViewState = this.state.viewState === ViewState.View;
        const showModifyNodeState = this.state.viewState === ViewState.ModifyNode;
        const showModifyConnectionState = this.state.viewState === ViewState.ModifyConnection;
        const showAddState = this.state.viewState === ViewState.Add;

        if (nodes.length > 0) {
            return (
                <NodeDrawer
                    nodes={nodes}
                    selectedId={selectedNode._id}
                    onNodeClick={this.onNodeClick}
                >
                    {showViewState
                        ?
                        <NodeCard
                            node={selectedNode}
                            onDeleteClick={this.onNodeDeleteClick}
                            onEditClick={this.onNodeEditClick}
                            onCloseClick={this.onNodeCloseClick}
                        />
                        : null
                    }
                    {showModifyNodeState
                        ?
                        <AddNodeCard
                            node={this.state.selectedNode}
                            onConnectionClick={this.onConnectionClick}
                            onCancelClick={this.onNodeCancelClick}
                            onSaveClick={this.onNodeSaveClick}
                        />
                        : null
                    }
                    {showAddState
                        ?
                        <AddNodeCard
                            onCancelClick={this.onNodeCancelClick}
                            onConnectionClick={this.onConnectionClick}
                            onSaveClick={this.onNodeSaveClick}
                        />
                        : null
                    }
                    {showModifyConnectionState
                        ?
                        <AddConnectionCard
                            connection={selectedConnection}
                            onCancelClick={this.onConnectionCancelClick}
                            onSaveClick={this.onConnectionSaveClick}
                        ></AddConnectionCard>
                        : null
                    }
                </NodeDrawer>
            );
        } else {
            return (<CircularProgress className={classes.progress} size={50} />);
        }
    }

    render(): JSX.Element {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <MainToolbar onAddClick={this.onNodeAddClick}></MainToolbar>
                {this.renderNodeDrawer()}
            </div>
        );
    }
}

export default withStyles(styles)(MainContainer);