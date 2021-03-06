import * as React from 'react';
import { Node } from "../../Models";
import ComboBox from '../Common/ComboBox';
import { Option } from 'react-select';

interface INodeSelectionListProps {
    nodes: Node[];
    selectedNode: Node;
    onChange: (id: string, title: string) => void;
}

export default class NodeSelectionList extends React.Component<INodeSelectionListProps, {}> {
    constructor(props: INodeSelectionListProps) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    private handleChange(option: Option): void {
        if (option.value !== "") {
            this.props.onChange(`${option.value}`, `${option.label}`);
        }
    }

    render(): JSX.Element {
        const { nodes, selectedNode } = this.props;

        const options = nodes
            .map(node => {
                return {
                    label: node.title,
                    value: node._id
                } as Option<string>
            });

        const selectedOption = {
            label: selectedNode.isEmpty ? "Select a node" : selectedNode.title,
            value: selectedNode.isEmpty ? "" : selectedNode._id
        } as Option<string>;

        return (
            <ComboBox
                options={options}
                selectedOption={selectedOption}
                onChange={this.handleChange}
                placeholder="Select a node to connect"/>
        );
    }
}