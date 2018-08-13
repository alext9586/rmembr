import * as React from 'react';
import { CircularProgress } from '@material-ui/core';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import NodeDrawer from '../NodeDrawer/NodeDrawer';
import Dependencies from '../../Services/Dependencies';
import { Node } from "../../Models/Node";
import { Connection } from '../../Models/Connection';
import NodeCard from "../NodeDrawer/NodeCard";
import AddNodeCard from '../AddNode/AddNodeCard';
import AddConnectionCard from '../AddConnection/AddConnectionCard';
import MainToolbar from './MainToolbar';
import { IConnectionPanelClickHandlers } from '../Connection/ConnectionPanel';

const styles = ({ spacing }: Theme) => createStyles({
    root: {
        flexGrow: 1,
    },
    progress: {
        margin: spacing.unit * 2,
    },
});

interface IMainContainerState {
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
    private connectionClickHandlers: IConnectionPanelClickHandlers;

    constructor(props: IMainContainerProps) {
        super(props);

        this.state = {
            selectedNode: new Node(),
            selectedConnection: new Connection(),
            viewState: ViewState.Loading
        };

        this.onNodeCloseClick = this.onNodeCloseClick.bind(this);
        this.onNodeAddClick = this.onNodeAddClick.bind(this);
        this.onNodeClick = this.onNodeClick.bind(this);
        this.onNodeCancelClick = this.onNodeCancelClick.bind(this);
        this.onNodeEditClick = this.onNodeEditClick.bind(this);
        this.onNodeEditSaveClick = this.onNodeEditSaveClick.bind(this);
        this.onNodeSaveClick = this.onNodeSaveClick.bind(this);
        this.onNodeDeleteClick = this.onNodeDeleteClick.bind(this);

        this.onConnectionCancelClick = this.onConnectionCancelClick.bind(this);
        this.onConnectionSaveClick = this.onConnectionSaveClick.bind(this);

        this.connectionClickHandlers = {
            add: () => { console.log("Add Connection") },
            connection: (id: string) => { console.log("Connection Clicked", id) },
            edit: this.onConnectionEditClick.bind(this),
            delete: this.onConnectionDeleteClick.bind(this)
        } as IConnectionPanelClickHandlers;

        this.nodeService.initWait().then(x => {
            this.setState({
                selectedNode: new Node(),
                selectedConnection: new Connection(),
                viewState: ViewState.Ready
            });
        });
    }

    private onConnectionEditClick(id: string): void {
        let connection = this.state.selectedNode.getConnection(id);
        this.setState({
            selectedConnection: connection,
            viewState: ViewState.ModifyConnection
        });
    }

    private onConnectionDeleteClick(id: string): void {
        let selectedNode = this.state.selectedNode;
        selectedNode.removeConnection(id);
        this.nodeService.updateNode(selectedNode);

        this.setState({
            selectedNode: selectedNode,
            selectedConnection: new Connection(),
            viewState: ViewState.View
        });
    }

    private onConnectionCancelClick(): void {
        this.setState({
            selectedConnection: new Connection(),
            viewState: ViewState.View
        });
    }

    private onConnectionSaveClick(connection: Connection): void {
        let selectedNode = this.state.selectedNode;
        selectedNode.updateConnection(connection);
        this.nodeService.updateNode(selectedNode);

        this.setState({
            selectedNode: selectedNode,
            selectedConnection: new Connection(),
            viewState: ViewState.View
        });
    }

    private onNodeClick(id: string): void {
        let found = this.nodeService.getNodes().filter(n => n._id === id);
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
        let viewState = (this.state.selectedNode.isEmpty) ? ViewState.Ready : ViewState.View;

        this.setState({
            selectedConnection: new Connection(),
            viewState: viewState
        });
    }

    private onNodeDeleteClick(node: Node): void {
        this.nodeService.deleteNode(node._id);
        this.setState({
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

    private onNodeEditSaveClick(node: Node): void {
        this.nodeService.updateNode(node);

        this.setState({
            selectedNode: node,
            selectedConnection: new Connection(),
            viewState: ViewState.View
        });
    }

    private onNodeSaveClick(node: Node): void {
        this.nodeService.addNode(node);

        this.setState({
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
        const nodes = this.nodeService.getNodes();
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
                            connectionClickHandlers={this.connectionClickHandlers}
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
                            onCancelClick={this.onNodeCancelClick}
                            onSaveClick={this.onNodeEditSaveClick}
                        />
                        : null
                    }
                    {showAddState
                        ?
                        <AddNodeCard
                            onCancelClick={this.onNodeCancelClick}
                            onSaveClick={this.onNodeSaveClick}
                        />
                        : null
                    }
                    {showModifyConnectionState
                        ?
                        <AddConnectionCard
                            connection={selectedConnection}
                            nodes={nodes}
                            selectedNode={selectedNode}
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