import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import NodeDrawerContainer from '../NodeDrawer/NodeDrawerContainer';
import Dependencies from '../../Services/Dependencies';
import { Node } from "../../Models/Node";
import NodeCard from "../NodeDrawer/NodeCard";
import { SampleNodes } from '../../Models/SampleNodes';
import AddNodeCard from '../AddNode/AddNodeCard';

const styles = ({ zIndex, palette, spacing, mixins }: Theme) => createStyles({
   
});

interface IMainContainerState {
    nodes: Node[],
    nodeToEdit: Node,
    viewState: ViewState
}

interface IMainContainerProps extends WithStyles<typeof styles> {

}

enum ViewState {
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
            nodeToEdit: new Node(),
            viewState: ViewState.View
        };

        this.onCancelClick = this.onCancelClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);

        this.nodeService.initWait().then(x => {
            this.setState({
                nodes: this.nodeService.getNodes()
            });
        });
    }

    private onCancelClick(): void {
        this.setState({
            nodes: this.state.nodes,
            nodeToEdit: new Node(),
            viewState: ViewState.View
        });
    }

    private onDeleteClick(node: Node): void {
        console.log(node);
    }

    private onEditClick(node: Node): void {
        this.setState({
            nodes: this.state.nodes,
            nodeToEdit: node,
            viewState: ViewState.Modify
        });
    }

    private onSaveClick(node: Node): void {
        console.log(node);
        this.setState({
            nodes: this.state.nodes,
            nodeToEdit: node,
            viewState: ViewState.View
        });
    }

    render(): JSX.Element {
        const nodes = this.state.nodes;

        const showViewState = this.state.viewState === ViewState.View;
        const showModifyState = this.state.viewState === ViewState.Modify;
        const showAddState = this.state.viewState === ViewState.Add;

        if (nodes.length > 0) {
            return (
                <NodeDrawerContainer nodes={nodes}>
                    {showViewState
                        ?
                        <NodeCard
                            node={this.sampleNodes[0]}
                            onDeleteClick={this.onDeleteClick}
                            onEditClick={this.onEditClick}
                        />
                        : null
                    }
                    {showModifyState
                        ?
                        <AddNodeCard
                            node={this.state.nodeToEdit}
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
                </NodeDrawerContainer>
            );
        } else {
            return (<div></div>);
        }
    }
}

export default withStyles(styles)(MainContainer);