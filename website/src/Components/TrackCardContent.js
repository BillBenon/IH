import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import {removeTrackSpaces} from "../utils/helper";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyles = makeStyles((theme) => ({
    media: {
        height: "116px",
        backgroundSize: "contain",
        margin: "25px 0",
    },
    cardcontent: {
        overflow: "hidden",
        padding: "0",
        height: "238px",
        marginBottom: "25px",
    },
    link: {
        color: "#E25252",
        textTransform: "none",
        fontWeight: "bold",
        fontSize: "18px",
        lineHeight: "150%",
        fontFamily: "'Gilroy', sans-serif",
        [theme.breakpoints.only("xs")]: {
            fontSize: "14.0372px",
            display: "flex",
        },
    },
    cardAction: {
        pointerEvents: "none",
    },
    descriptionWrapper: {
        padding: "0",
        margin: "25px 0",
        overflow: "hidden",
    },
    heading: {
        lineHeight: "150%",
        fontWeight: "bold",
        fontSize: "21px",
        color: "#37281F",
        textTransform: "uppercase",
        textAlign: "center",
        [theme.breakpoints.only("xs")]: {
            fontWeight: "600",
            fontSize: "16.3767px",
            lineHeight: "150%",
            textAlign: "center",
            color: "#37281F",
        },
    },
}));

const TrackCardContent = ({item}) => {
    const classes = useStyles();

    return (<div>
        <CardMedia className={classes.media} image={item.logo} title={item.title}/>
        <CardActionArea className={classes.cardAction}>
            <CardContent className={classes.cardcontent}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    className={classes.heading}
                >
                    {item.title}
                </Typography>
                <div className={classes.descriptionWrapper}>
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        paragraph
                        dangerouslySetInnerHTML={{__html: item.description}}
                    />
                    <Typography
                        variant="body2"
                        color="textSecondary"
                        paragraph
                        dangerouslySetInnerHTML={{__html: item.detailsDescription}}
                    />
                </div>
            </CardContent>
        </CardActionArea>
        <Link href={`track/${removeTrackSpaces(item.title)}`} className={classes.link}>
            Learn more
        </Link>
    </div>);
};

export default TrackCardContent;