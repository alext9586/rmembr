import * as React from 'react';
import { Connection } from '../../Models/Connection';
import List from '@material-ui/core/List';
import ConnectionRow from './ConnectionRow';
import { IConnectionRowClickHandlers } from './ConnectionRow';

interface IConnectionListState {
    
}

interface IConnectionListProp {
    connections: Connection[];
    onClickHandlers: IConnectionRowClickHandlers;
}

export default class ConnectionList extends React.Component<IConnectionListProp, IConnectionListState> {
    constructor(props: IConnectionListProp) {
        super(props);
    }

    render(): JSX.Element {
        const { onClickHandlers } = this.props;

        const listItems = this.props.connections.map(c => {
            return (
                <ConnectionRow key={c._id}
                    connection={c}
                    onClickHandlers={onClickHandlers}>
                </ConnectionRow>
            );
        });

        return (
            <List component="ul" dense={true}>
                {listItems}
            </List>
        );
    }
}
