import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import NodeDrawer from '../NodeDrawer/NodeDrawer';
import Dependencies from '../../Services/Dependencies';
import { Node } from "../../Models/Node";
import NodeCard from "../NodeDrawer/NodeCard";
import { SampleNodes } from '../../Models/SampleNodes';
import AddNodeCard from '../AddNode/AddNodeCard';

const styles = ({ zIndex, palette, spacing, mixins }: Theme) => createStyles({
   
});

interface IMainContainerState {
    nodes: Node[],
    selectedNode: Node,
    viewState: ViewState
}

interface IMainContainerProps extends WithStyles<typeof styles> {

}

enum ViewState {
    Init,
    View,
    Add,
    Modify
}

class MainContainer extends React.Component<IMainContainerProps, IMainContainerState> {
    private nodeService = Dependencies.nodeService;
    private sampleNodes = SampleNodes.create(4);

    constructor(props: IMainContainerProps) {
        super(props);

        this.state = {
            nodes: [],
            selectedNode: new Node(),
            viewState: ViewState.Init
        };

        this.onNodeClick = this.onNodeClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);

        this.nodeService.initWait().then(x => {
            this.setState({
                //nodes: this.nodeService.getNodes()
                nodes: this.sampleNodes
            });
        });
    }

    private onNodeClick(id: string): void {
        const found = this.state.nodes.filter(n => n._id === id);
        this.setState({
            nodes: this.state.nodes,
            selectedNode: found[0],
            viewState: ViewState.View
        });
    }

    private onCancelClick(): void {
        this.setState({
            nodes: this.state.nodes,
            selectedNode: new Node(),
            viewState: ViewState.View
        });
    }

    private onDeleteClick(node: Node): void {
        console.log(node);
    }

    private onEditClick(node: Node): void {
        this.setState({
            nodes: this.state.nodes,
            selectedNode: node,
            viewState: ViewState.Modify
        });
    }

    private onSaveClick(node: Node): void {
        console.log(node);
        this.setState({
            nodes: this.state.nodes,
            selectedNode: node,
            viewState: ViewState.View
        });
    }

    render(): JSX.Element {
        const nodes = this.state.nodes;
        const selectedNode = this.state.selectedNode;

        const showViewState = this.state.viewState === ViewState.View;
        const showModifyState = this.state.viewState === ViewState.Modify;
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
                    {showModifyState
                        ?
                        <AddNodeCard
                            node={this.state.selectedNode}
                            onCancelClick={this.onCancelClick}
                            onSaveClick={this.onSaveClick}
                        />
                        : null
                    }
                    {showAddState
                        ?
                        <AddNodeCard
                            onCancelClick={this.onCancelClick}
                            onSaveClick={this.onSaveClick}
                        />
                        : null
                    }
                </NodeDrawer>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default withStyles(styles)(MainContainer);