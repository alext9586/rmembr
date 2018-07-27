import * as React from 'react';
import SimpleCard from '../SimpleCard/SimpleCard';
import TitleNotesForm from '../TitleNotesForm/TitleNotesForm';
import CancelSaveActions from '../SimpleCard/CancelSaveActions';
import { Connection } from '../../Models/Connection';

interface IAddConnectionCardState {
    connection: Connection;
}

interface IAddConnectionCardProps {
    connection?: Connection;
    onCancelClick: (event: any) => void;
    onSaveClick: (connection: Connection) => void;
}

export default class AddConnectionCard extends React.Component<IAddConnectionCardProps, IAddConnectionCardState> {
    constructor(props: IAddConnectionCardProps) {
        super(props);

        this.state = {
            connection: this.props.connection || new Connection()
        };

        this.onTitleBlur = this.onTitleBlur.bind(this);
        this.onNotesBlur = this.onNotesBlur.bind(this);
        this.handleSaveClick = this.handleSaveClick.bind(this);
    }

    private onTitleBlur(event: any): void {
        var connection = this.state.connection;
        connection.title = event.target.value;

        this.setState(
            {
                connection: connection
            }
        );
    }

    private onNotesBlur(event: any): void {
        var connection = this.state.connection;
        connection.notes = event.target.value;

        this.setState(
            {
                connection: connection
            }
        );
    }

    private handleSaveClick(): void {
        const connection = this.state.connection;
        this.props.onSaveClick(connection);
    }

    render(): JSX.Element {
        const { onCancelClick } = this.props;
        const { title, notes } = this.state.connection;
        const actions = (
            <CancelSaveActions
                onCancelClick={onCancelClick}
                onSaveClick={this.handleSaveClick} />
        );

        // Check if it was even passed in
        const cardTitle = this.props.connection ? "Edit Connection" : "Add Connection"

        return (
            <SimpleCard title={cardTitle} actions={actions}>
                <TitleNotesForm
                    title={title}
                    notes={notes}
                    onTitleBlur={this.onTitleBlur}
                    onNotesBlur={this.onNotesBlur}
                />
            </SimpleCard>
        );
    }
}
