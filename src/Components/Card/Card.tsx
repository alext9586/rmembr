import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
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

function SimpleCard(props) {
    const { classes } = props;
    const bull = <span className={classes.bullet}>•</span>;

    var propTypes = {
        classes: PropTypes.object.isRequired
    };

    return (
        <div>
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary">
                        Word of the Day
                    </Typography>
                    <Typography variant="headline" component="h2">
                        be{bull}nev{bull}o{bull}lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    <Typography component="p">
                        well meaning and kindly.<br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        </div>
    );
}

export default withStyles(styles)(SimpleCard);
