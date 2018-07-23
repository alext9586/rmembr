import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

interface ISimpleCardProps {
    title: string;
}

export default class SimpleCard extends React.Component<ISimpleCardProps, {}> {
    constructor(props: ISimpleCardProps) {
        super(props);
    }

    private styles = {
        card: {
            minWidth: 275,
            maxWidth: 400
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
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
        return (
            <div>
                <Card className={props.classes.card}>
                    <CardContent>
                        <Typography variant="headline" component="h1">
                            { props.title }
                        </Typography>
                        <Typography component="p">
                            { props.children }
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }

    render(): JSX.Element {
        const MuiCard = withStyles(this.styles)(this.MuiCard);
        return (
            <MuiCard title={this.props.title}>
                { this.props.children }
            </MuiCard>
        );
    }
}
