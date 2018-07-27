import * as React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, CardActions, Typography, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';

const styles = createStyles({
    card: {
        minWidth: 275,
        maxWidth: 500,
    },
    pos: {
        marginBottom: 12,
    },
    action: {
        display: "block"
    }
});

interface ISimpleCardProps extends WithStyles<typeof styles>{
    title?: string;
    headline?: string;
    actions?: JSX.Element;
    onClose?: () => void;
}

class SimpleCard extends React.Component<ISimpleCardProps, {}> {
    constructor(props: ISimpleCardProps) {
        super(props);
    }

    render(): JSX.Element {
        const { classes, actions, title, onClose } = this.props;

        const cardTitle = title
            ? <Typography align="left" color="textSecondary">
                {this.props.title}
            </Typography>
            : null;
        
        const headerElement =
            <CardHeader
                action={
                    onClose
                        ?
                        <IconButton onClick={e => onClose()}>
                            <Close />
                        </IconButton>
                        : null
                }
                title={cardTitle}>
            </CardHeader>;
        
        const actionsElement = actions
            ? <CardActions className={classes.action}>{this.props.actions}</CardActions>
            : null;
        
        return (
            <Card className={classes.card}>
                {headerElement}
                <CardContent>
                    <Typography align="left" component="div">
                        {this.props.children}
                    </Typography>
                </CardContent>
                {actionsElement}
            </Card>
        );
    }
}

export default withStyles(styles)(SimpleCard)