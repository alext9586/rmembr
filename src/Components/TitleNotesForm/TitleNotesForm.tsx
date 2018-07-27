import * as React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Node } from '../../Models/Node';

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

interface ITitleNotesFormState {
    title?: string;
    notes?: string;
}

interface ITitleNotesFormProps extends WithStyles<typeof styles> {
    title: string;
    notes: string;
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