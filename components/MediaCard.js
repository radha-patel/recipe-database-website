import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 250,
    },
});

export default function MediaCard({ thumbnail, label }) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={thumbnail}
                    title={label}
                />
            </CardActionArea>
            <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {label}
                </Typography>
            </CardContent>
            <CardActions>
                <Link href="/food/[label]" as={`/food/${label}`}>
                    <Button size="small" color="primary">
                        Recipe
                    </Button>
                </Link>
            </CardActions>
        </Card>
    );
}


