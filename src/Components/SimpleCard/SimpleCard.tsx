import * as React from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { CardActions } from '@material-ui/core';

const styles = createStyles({
    card: {
        minWidth: 275,
        maxWidth: 400,
    },
    title: {
        marginBottom: 16,
        fontSize: 14,
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
}

class SimpleCard extends React.Component<ISimpleCardProps, {}> {
    constructor(props: ISimpleCardProps) {
        super(props);
    }

    render(): JSX.Element {
        const { classes } = this.props;

        const title = this.props.title
            ? <Typography align="left" className={classes.title} color="textSecondary">
                {this.props.title}
            </Typography>
            : null;
        
        const actions = this.props.actions
            ? <CardActions className={classes.action}>{this.props.actions}</CardActions>
            : null;
        
        return (
            <Card className={classes.card}>
                <CardContent>
                    {title}
                    <Typography align="left" component="p">
                        {this.props.children}
                    </Typography>
                </CardContent>
                {actions}
            </Card>
        );
    }
}

export default withStyles(styles)(SimpleCard)