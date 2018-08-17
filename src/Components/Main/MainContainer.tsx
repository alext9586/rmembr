import * as React from 'react';
import { Node, Connection, PanelModifyState } from "../../Models";
import { CircularProgress } from '@material-ui/core';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import NodeDrawer from '../NodeDrawer/NodeDrawer';
import Dependencies from '../../Services/Dependencies';
import NodeCard from "../NodeDrawer/NodeCard";
import NodePanel from './NodePanel';
import ConnectionPanel from './ConnectionPanel';
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
    AddNode,
    EditNode,
    AddConnection,
    EditConnection
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
        this.onNodeSaveClick = this.onNodeSaveClick.bind(this);
        this.onNodeDeleteClick = this.onNodeDeleteClick.bind(this);

        this.onConnectionCancelClick = this.onConnectionCancelClick.bind(this);
        this.onConnectionSaveClick = this.onConnectionSaveClick.bind(this);

        this.connectionClickHandlers = {
            add: this.onConnectionAddClick.bind(this),
            connection: this.onConnectionGoToNodeClick.bind(this),
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

    private viewNode(selectedNode: Node): void {
        this.setState({
            selectedNode: selectedNode,
            selectedConnection: new Connection(),
            viewState: ViewState.View
        });
    }

    private onConnectionAddClick(): void {
        this.setState({
            selectedConnection: new Connection(),
            viewState: ViewState.AddConnection
        });
    }

    private onConnectionGoToNodeClick(id: string): void {
        let selectedConnection = this.state.selectedNode.getConnection(id);
        let selectedNodeId = selectedConnection.nextId;
        let selectedNode = this.nodeService.getNode(selectedNodeId);
        this.viewNode(selectedNode);
    }

    private onConnectionEditClick(id: string): void {
        let connection = this.state.selectedNode.getConnection(id);
        this.setState({
            selectedConnection: connection,
            viewState: ViewState.EditConnection
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

    private onConnectionSaveClick(node: Node): void {
        this.setState({
            selectedNode: node,
            selectedConnection: new Connection(),
            viewState: ViewState.View
        })
    }

    private onNodeClick(id: string): void {
        let found = this.nodeService.getNodes().filter(n => n._id === id);
        this.viewNode(found[0]);
    }

    private onNodeAddClick(): void {
        this.setState({
            selectedNode: new Node(),
            selectedConnection: new Connection(),
            viewState: ViewState.AddNode
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
            viewState: ViewState.EditNode
        });
    }

    private onNodeSaveClick(node: Node): void {
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
        const showEditNodeState = this.state.viewState === ViewState.EditNode;
        const showEditConnectionState = this.state.viewState === ViewState.EditConnection;
        const showAddNodeState = this.state.viewState === ViewState.AddNode;
        const showAddConnectionState = this.state.viewState === ViewState.AddConnection;

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
                    {showEditNodeState || showAddNodeState
                        ?
                        <NodePanel
                            displayState={showAddNodeState
                                ? PanelModifyState.Add
                                : PanelModifyState.Edit}
                            nodeService={this.nodeService}
                            selectedNode={selectedNode}
                            selectedConnection={selectedConnection}
                            onSaveClick={this.onNodeSaveClick}
                            onCancelClick={this.onNodeCancelClick}
                        ></NodePanel>
                        : null
                    }
                    {showEditConnectionState || showAddConnectionState
                        ?
                        <ConnectionPanel
                            displayState={showAddConnectionState
                                ? PanelModifyState.Add
                                : PanelModifyState.Edit}
                            nodeService={this.nodeService}
                            selectedNode={this.state.selectedNode}
                            selectedConnection={this.state.selectedConnection}
                            onSaveClick={this.onConnectionSaveClick}
                            onCancelClick={this.onConnectionCancelClick}
                        ></ConnectionPanel>
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