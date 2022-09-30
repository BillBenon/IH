import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import PersonIcon from "@material-ui/icons/Person";
import ApartmentIcon from "@material-ui/icons/Apartment";
import Link from "@material-ui/core/Link";
import {Button} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
    expertName: {
        fontWeight: "bold", fontSize: "20px",
    }, userIcon: {
        width: "45px !important", marginLeft: "10px", marginRight: "10px"
    }, workIcon: {
        width: "30px !important", marginLeft: "17.5px", marginRight: "17.5px"
    }, expertWork: {
        fontWeight: "bold", fontSize: "16px",
    },
    row: {display: "flex", alignItems: "center"},
    rowSeperated: {display: "flex", justifyContent: "space-between", alignItems: "center"},
    productCardContent: {
        overflow: "hidden",
        padding: "0",
        marginBottom: "25px",
        display: "flex",
        flexDirection: "column",
        maxHeight: "400px"
    }, expertProfileDesc: {
        padding: "0",
        margin: "25px 0",
        overflow: "hidden",
        height: "210px"
    }
}));

const ProductCardContent = ({item}) => {
    const classes = useStyles();
    return <div>
        <CardContent className={classes.productCardContent}>
            <Typography
                gutterBottom
                variant="h5"
                component="h2"
                className={classes.heading}
            >
                {item.displayName}
            </Typography>
            <div className={classes.row}>
                <PersonIcon className={classes.userIcon}/>
                <Typography gutterBottom variant={"h5"}
                            className={classes.expertName}> {item.expertInfo.name}
                </Typography>
            </div>
            <div className={classes.row}>
                <ApartmentIcon className={classes.workIcon}/>
                <Typography gutterBottom variant={"h5"}
                            className={classes.expertWork}> {item.expertInfo.workingAt}
                </Typography>
            </div>
            <div className={classes.expertProfileDesc}>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    paragraph
                    dangerouslySetInnerHTML={{__html:  item.expertInfo.profile}}
                />
            </div>
        </CardContent>
        <div className={classes.rowSeperated}>
            <Link className={classes.link}>
                View More Details
            </Link>
            <Button component="button"
                    variant="contained"
                    disableRipple
                    className={'successBtn'}>Book Now</Button>
        </div>
    </div>;
}

export default ProductCardContent;