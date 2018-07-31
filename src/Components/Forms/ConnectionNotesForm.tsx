import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styles from './Styles';

interface IConnectionNotesFormState {
    notes?: string;
}

interface IConnectionNotesFormProps extends WithStyles<typeof styles> {
    notes: string;
    onNotesBlur: (event: any) => void;
}

class ConnectionNotesForm extends React.Component<IConnectionNotesFormProps, IConnectionNotesFormState> {
    constructor(props: IConnectionNotesFormProps) {
        super(props);

        this.state = {
            notes: this.props.notes ? this.props.notes : ""
        }

        this.handleNotesChange = this.handleNotesChange.bind(this)
    }

    private handleNotesChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            notes: event.target.value
        });
    }

    render(): JSX.Element {
        const { classes, onNotesBlur } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="notes"
                    label="Notes"
                    className={classes.textField}
                    value={this.state.notes}
                    onChange={this.handleNotesChange}
                    onBlur={onNotesBlur}
                    multiline
                    rowsMax="5"
                    margin="normal"
                    fullWidth
                />
            </form>
        )
    }
}

export default withStyles(styles)(ConnectionNotesForm);