import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = ({ spacing }: Theme) => createStyles({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: spacing.unit,
        marginRight: spacing.unit,
    },
    menu: {
        width: 200,
    },
});

interface IAddNodeFormState {
    title: string;
    notes: string;
}

interface IAddNodeFormProps extends WithStyles<typeof styles> {
}

class AddNodeForm extends React.Component<IAddNodeFormProps, IAddNodeFormState> {
    constructor(props: IAddNodeFormProps) {
        super(props);

        this.state = {
            title: "",
            notes: ""
        }

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleNotesChange = this.handleNotesChange.bind(this)
    }

    private handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            title: event.target.value,
            notes: this.state.notes
        });
    }

    private handleNotesChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            title: this.state.title,
            notes: event.target.value
        });
    }

    render(): JSX.Element {
        const { classes } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    margin="normal"
                    fullWidth
                />
                <TextField
                    id="notes"
                    label="Notes"
                    className={classes.textField}
                    value={this.state.notes}
                    onChange={this.handleNotesChange}
                    multiline
                    rows="5"
                    margin="normal"
                    fullWidth
                />
            </form>
        )
    }
}

export default withStyles(styles)(AddNodeForm);