import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import NodeDrawer from '../NodeDrawer/NodeDrawer';
import Dependencies from '../../Services/Dependencies';
import { Node } from "../../Models/Node";
import NodeCard from "../NodeDrawer/NodeCard";
import AddNodeCard from '../AddNode/AddNodeCard';
import { Connection } from '../../Models/Connection';
import AddConnectionCard from '../AddConnection/AddConnectionCard';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = ({ spacing }: Theme) => createStyles({
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

        this.onNodeClick = this.onNodeClick.bind(this);
        this.onConnectionClick = this.onConnectionClick.bind(this);
        this.onConnectionCancelClick = this.onConnectionCancelClick.bind(this);
        this.onConnectionSaveClick = this.onConnectionSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);

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
            nodes: this.state.nodes,
            selectedNode: this.state.selectedNode,
            selectedConnection: connection,
            viewState: ViewState.ModifyConnection
        });
    }

    private onConnectionCancelClick(): void {
        this.setState({
            nodes: this.state.nodes,
            selectedNode: this.state.selectedNode,
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
            nodes: this.state.nodes,
            selectedNode: found[0],
            selectedConnection: new Connection(),
            viewState: ViewState.View
        });
    }

    private onCancelClick(): void {
        this.setState({
            nodes: this.state.nodes,
            selectedNode: new Node(),
            selectedConnection: new Connection(),
            viewState: ViewState.View
        });
    }

    private onDeleteClick(node: Node): void {
        this.nodeService.deleteNode(node._id);
        this.setState({
            nodes: this.nodeService.getNodes(),
            selectedNode: new Node(),
            selectedConnection: new Connection(),
            viewState: ViewState.Ready
        });
    }

    private onEditClick(node: Node): void {
        this.setState({
            nodes: this.state.nodes,
            selectedNode: node,
            selectedConnection: new Connection(),
            viewState: ViewState.ModifyNode
        });
    }

    private onSaveClick(node: Node): void {
        console.log(node);
        this.setState({
            nodes: this.state.nodes,
            selectedNode: node,
            selectedConnection: new Connection(),
            viewState: ViewState.View
        });
    }

    render(): JSX.Element {
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
                            onDeleteClick={this.onDeleteClick}
                            onEditClick={this.onEditClick}
                        />
                        : null
                    }
                    {showModifyNodeState
                        ?
                        <AddNodeCard
                            node={this.state.selectedNode}
                            onConnectionClick={this.onConnectionClick}
                            onCancelClick={this.onCancelClick}
                            onSaveClick={this.onSaveClick}
                        />
                        : null
                    }
                    {showAddState
                        ?
                        <AddNodeCard
                            onCancelClick={this.onCancelClick}
                            onConnectionClick={this.onConnectionClick}
                            onSaveClick={this.onSaveClick}
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
}

export default withStyles(styles)(MainContainer);