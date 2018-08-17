import * as React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IDeleteConfirmationDialogProp {
    open: boolean;
    onClose: () => void;
    onDelete: () => void;
    title: string;
    body: string;
}

export default class DeleteConfirmationDialog extends React.Component<IDeleteConfirmationDialogProp, {}> {
    constructor(props: IDeleteConfirmationDialogProp) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    private handleClose(event: any): void {
        this.props.onClose();
    }

    private handleDelete(event: any): void {
        this.props.onDelete();
    }

    render(): JSX.Element {
        const { open, title, body } = this.props;
        return (
            <Dialog
                open={open}
                onClose={this.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {body}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="default">
                        Cancel
                    </Button>
                    <Button onClick={this.handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}