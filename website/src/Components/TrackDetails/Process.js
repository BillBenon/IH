import { Box, makeStyles, Paper, Typography } from '@material-ui/core'
import ArrowRight from '@material-ui/icons/ArrowRight'
import React from 'react'
import { colorsArray } from '../../utils/Constants'
import { MarketingWrapper } from './MarketingWrapper'
import clsx from 'clsx';
import Color from 'color';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
    ourProcess: {
        overflow: "auto",
    },
    bubble: {
        color: "#fff",
        display: "flex",
        borderRadius: "50%",
        width: "2.5rem",
        height: "2.5rem",
        alignItems: "center",
        justifyContent: "center",
        marginLeft: "-17px",
        marginBottom: "-17px",
        zIndex: "1",
        [theme.breakpoints.down('sm')]: {
            marginRight: "-20px !important",
            marginLeft: "-10px",
        }
    },
    circle: {
        height: "11rem",
        width: "13rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "15px",
        fontSize: "14px",
        fontWeight: "normal",
        backgroundColor: "transparent",
        textAlign: "center",
    },
    arrow: {
        height: "8rem",
        marginTop: "3rem",
    },
}));

export const Process = ({ processSteps }) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');

    const renderDesktop = () => {
        return <Box className={classes.ourProcess} paddingBottom={2} display="flex" justifyContent="center" alignItems="flex-start">
            {processSteps?.map((process, inx) => {
                return <>
                    <div>
                        <Paper className={classes.bubble} style={{ backgroundColor: colorsArray.length > inx + 1 ? `${colorsArray[inx]}` : "#ccc" }}>{inx + 1}</Paper>
                        <Paper elevation={3} variant="outlined" style={{ border: "0", backgroundColor: colorsArray.length > inx + 1 ? Color(colorsArray[inx]).fade(0.8) : "#ccc" }} className={clsx(classes.circle)} >
                            <Typography variant="h7">{typeof process == "string" ? process : process?.stepDescription}</Typography>
                        </Paper>
                    </div>
                    {inx < processSteps.length - 1 && <Box display="flex" alignItems="center" justifyContent="center" className={classes.arrow}>
                        <ArrowRight />
                    </Box>}
                </>
            })}
        </Box>
    }

    const renderMobile = () => {
        return <AutoPlaySwipeableViews>
            {processSteps?.map((process, inx) => {
                return <Box className={classes.ourProcess} paddingBottom={2} display="flex" justifyContent="center" alignItems="flex-start">
                    <Paper className={classes.bubble} style={{ backgroundColor: colorsArray.length > inx + 1 ? `${colorsArray[inx]}` : "#ccc" }}>{inx + 1}</Paper>
                    <Paper elevation={3} variant="outlined" style={{ border: "0", backgroundColor: colorsArray.length > inx + 1 ? Color(colorsArray[inx]).fade(0.8) : "#ccc" }} className={clsx(classes.circle)} >
                        <Typography variant="h7">{typeof process == "string" ? process : process?.stepDescription}</Typography>
                    </Paper>
                </Box>
            })}
        </AutoPlaySwipeableViews>
    }

    return (
        <MarketingWrapper title={"Our Process"}>
            {matches ? renderDesktop() : renderMobile()}
        </MarketingWrapper>
    )
}
