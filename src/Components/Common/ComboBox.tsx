import * as React from 'react';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select' ;
import { Option, Options, OnChangeHandler } from 'react-select';

interface IComboBoxState {
    selectedOption: Option<string>;
}

interface IComboBoxProps {
    options: Options<string>;
    selectedOption: Option<string>;
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: Option<string>) => void;
}

export default class ComboBox extends React.Component<IComboBoxProps, IComboBoxState> {
    private handleChange: OnChangeHandler<string> = (option: Option<string>) => {
        this.setState({
            selectedOption: option
        }, () => {
            this.props.onChange(this.state.selectedOption);
        });
    };

    constructor(props: IComboBoxProps) {
        super(props);

        this.state = {
            selectedOption: this.props.selectedOption
        }

        this.handleChange = this.handleChange.bind(this);
    }

    render(): JSX.Element {
        const { options, placeholder, disabled } = this.props;
        
        return (
            <div>
                <NoSsr>
                    <Select
                        options={options}
                        value={this.state.selectedOption}
                        onChange={this.handleChange}
                        placeholder={placeholder}
                        disabled={disabled}
                        searchable={true} />
                </NoSsr>
            </div>
        );
    }
}
