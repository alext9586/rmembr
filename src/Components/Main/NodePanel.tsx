import * as React from 'react';
import { Node, PanelModifyState } from "../../Models";
import { IMainPanelProps } from './IMainPanelProps';
import AddNodeCard from '../AddNode/AddNodeCard';

export default class NodePanel extends React.Component<IMainPanelProps, {}> {
    constructor(props: IMainPanelProps) {
        super(props);

        this.onAddSaveClick = this.onAddSaveClick.bind(this);
        this.onEditSaveClick = this.onEditSaveClick.bind(this);
    }

    private onAddSaveClick(node: Node): void {
        this.props.nodeService.addNode(node);
        this.props.onSaveClick(node);
    }

    private onEditSaveClick(node: Node): void {
        this.props.nodeService.updateNode(node);
        this.props.onSaveClick(node);
    }

    render(): JSX.Element {
        const { displayState, selectedNode, onCancelClick } = this.props;

        const showAddState = displayState === PanelModifyState.Add;
        const showEditState = displayState === PanelModifyState.Edit;

        return (
            <div>
                {showAddState
                    ?
                    <AddNodeCard
                        onCancelClick={onCancelClick}
                        onSaveClick={this.onAddSaveClick}
                    />
                    : null
                }
                {showEditState
                    ?
                    <AddNodeCard
                        node={selectedNode}
                        onCancelClick={onCancelClick}
                        onSaveClick={this.onEditSaveClick}
                    />
                    : null
                }
            </div>
        );
    }
}