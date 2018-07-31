import * as React from 'react';
import ComboBox from '../Common/ComboBox';
import { Node } from '../../Models/Node';
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
        this.props.onChange(`${option.value}`, `${option.label}`);
    }

    render(): JSX.Element {
        const { nodes, selectedNode } = this.props;

        const options = nodes
            .filter(n1 => n1._id !== selectedNode._id)
            .map(n2 => {
                return {
                    label: n2.title,
                    value: n2._id
                } as Option<string>
            });

        const selectedOption = {
            label: selectedNode.title,
            value: selectedNode._id
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