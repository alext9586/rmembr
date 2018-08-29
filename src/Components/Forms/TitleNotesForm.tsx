import * as React from 'react';
import { withStyles, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styles from './Styles';

interface ITitleNotesFormState {
    title?: string;
    notes?: string;
}

interface ITitleNotesFormProps extends WithStyles<typeof styles> {
    title: string;
    notes: string;
    onTitleChange: (title: string) => void;
    onTitleBlur: (event: any) => void;
    onNotesBlur: (event: any) => void;
}

class TitleNotesForm extends React.Component<ITitleNotesFormProps, ITitleNotesFormState> {
    constructor(props: ITitleNotesFormProps) {
        super(props);

        this.state = {
            title: this.props.title ? this.props.title : "",
            notes: this.props.notes ? this.props.notes : ""
        }

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleNotesChange = this.handleNotesChange.bind(this)
    }

    private handleTitleChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            title: event.target.value
        }, () => {
            this.props.onTitleChange(this.state.title || "")
        });
    }

    private handleNotesChange(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({
            notes: event.target.value
        });
    }

    render(): JSX.Element {
        const { classes, onTitleBlur, onNotesBlur } = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="title"
                    label="Title"
                    className={classes.textField}
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    onBlur={onTitleBlur}
                    margin="normal"
                    fullWidth
                />
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

export default withStyles(styles)(TitleNotesForm);