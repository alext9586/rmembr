import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles, } from '@material-ui/core/styles';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import NoSsr from '@material-ui/core/NoSsr';
import Select from 'react-select' ;
import { Option, Options, OnChangeHandler } from 'react-select';

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 250,
    },
});


interface IComboBoxState {
    selectedOption: Option<string>;
}

interface IComboBoxProps extends WithStyles<typeof styles> {
    options: Options<string>;
    selectedOption: Option<string>;
    placeholder?: string;
    disabled?: boolean;
    onChange: (value: Option<string>) => void;
}

class ComboBox extends React.Component<IComboBoxProps, IComboBoxState> {
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
        const { classes, options, placeholder, disabled } = this.props;
        
        return (
            <div className={classes.root}>
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

export default withStyles(styles)(ComboBox);