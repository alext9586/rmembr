import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface ISimpleCardProps {
    title?: string;
    headline?: string;
}

export default class SimpleCard extends React.Component<ISimpleCardProps, {}> {
    constructor(props: ISimpleCardProps) {
        super(props);
    }

    private styles = {
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
    };

    private MuiCard(props): JSX.Element {
        const { classes } = props;

        const title = props.title
            ? <Typography align="left" className={classes.title} color="textSecondary">
                {props.title}
            </Typography>
            : null;

        const headline = props.headline
            ? <Typography align="left" variant="headline" component="h1">
                {props.headline}
            </Typography>
            : null;
        
        return (
            <Card className={classes.card}>
                <CardContent>
                    {title}
                    {headline}
                    <Typography align="left" component="p">
                        {props.children}
                    </Typography>
                </CardContent>
            </Card>
        );
    }

    render(): JSX.Element {
        const MuiCard = withStyles(this.styles)(this.MuiCard);
        return (
            <MuiCard title={this.props.title} headline={this.props.headline}>
                { this.props.children }
            </MuiCard>
        );
    }
}
