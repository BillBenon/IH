import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import {Grid} from "@material-ui/core";
import ProductCardContent from "./ProductCardContent";
import TrackCardContent from "./TrackCardContent";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(2),
        padding: "25px",
        height: "506px",
        boxShadow:
            "0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)",
        [theme.breakpoints.only("xs")]: {
            margin: "0",
        },
    },
    grid: {
        [theme.breakpoints.only('xs')]: {
            marginLeft: '0px !important',
        }
    }
}));

export default function TrackCard({productsList, tracksList}) {
    const classes = useStyles();
    const [list, setList] = useState([]);

    useEffect(() => {
        if (productsList && productsList.length)
            setList(productsList);
        else if (tracksList && tracksList.length)
            setList(tracksList);
    });

    const RenderCard = ({item}) => {
        if (list === productsList)
            return <ProductCardContent item={item}/>;
        else if (list === tracksList)
            return <TrackCardContent item={item}/>;
        else
            return <></>;
    };

    return (
        list.map((item, index) =>
            <Grid className={classes.grid} item justify="start" lg={4} md={4} sm={6}
                  xs={12}>
                <Card className={classes.root} key={index}>
                        <RenderCard item={item}/>
                </Card>
            </Grid>)
    );
}
