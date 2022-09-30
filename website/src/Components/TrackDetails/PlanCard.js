import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box, Button, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography, Link } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import React, { useState } from 'react';
import { TrackDetailConsts } from '../../utils/Constants';
import MoreHoriz from '@material-ui/icons/MoreHoriz';
import Color from 'color';

const useStyles = makeStyles((theme) => ({
    container: {
        [theme.breakpoints.down('sm')]: {
            padding: '15px !important',
            margin: "15px 30px !important"
        }
    },
    cardMargin: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
        [theme.breakpoints.down('sm')]: {
        }
    },
    keyPoints: {
        color: "#FFF",
        padding: "5px 20px",
        fontSize: "18px",
        fontWeight: "bold",
        margin: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        [theme.breakpoints.down('sm')]: {
            fontSize: "16px",
            padding: "5px",
        }
    },
    priceList: {
        height: "100%",
        [theme.breakpoints.down('sm')]: {
            paddingTop: "20px !important"
        }
    },
    listItemIcon: {
        minWidth: "30px !important"
    },
    planCheckList: {
        fontSize: "14px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "#545454",
    },
    registerBtnRoot: {
        width: "80%",
        textTransform: "uppercase",
        marginTop: "10px",
    },
    priceContent: {
        color: "#7E7E7E",
        textTransform: "uppercase",
        fontSize: "14px"
    },
    showMoreText: {
        display: "flex",
        justifyContent: "center",
    },
    matIcon: {
        height: "20px !important",
    }
}));
export const PlanCard = ({ listItems, onCTAClick, ctaText, headingText, priceContent, theme }) => {
    const classes = useStyles();
    const [showMore, setShowMore] = useState(false);

    const handleShowMorePlan = () => {
        setShowMore(!showMore)
    }

    return (
        <Card className={classes.container} style={{ height: showMore ? "100%" : "22rem", backgroundColor: Color(theme.color).fade(0.9) }}>
            <CardContent className={classes.cardMargin}>
                <Grid container spacing={3}>
                    <Grid item justify="start" sm={12} xs={12}>
                        <Paper style={{ backgroundColor: theme.color }} elevation={5} variant="elevation" square={true}>
                            <Typography className={classes.keyPoints}>
                                {headingText}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
                <List className={classes.priceList}>
                    {listItems.filter((i, inx) => inx < TrackDetailConsts.MaxPlanPoints || showMore).map((d, inx) => <ListItem key={d}>
                        <ListItemIcon className={classes.listItemIcon}>
                            <FontAwesomeIcon icon={faCheck} size='1x' color={theme.color} />
                        </ListItemIcon>
                        <ListItemText primary={
                            <Typography className={classes.planCheckList}>{d}</Typography>}>
                        </ListItemText>
                    </ListItem>)}
                    {listItems.length > TrackDetailConsts.MaxPlanPoints && <Typography className={classes.showMoreText}>
                        <Link href="javascript:void(0)" onClick={() => handleShowMorePlan()}> {/* eslint-disable-line */}
                            <MoreHoriz classes={{ root: classes.matIcon }} />
                        </Link>
                    </Typography>}
                </List>
                {priceContent && <Box display="flex" justifyContent="center">
                    <Paper elevation={3} variant="elevation"><Typography variant="h4" style={{ backgroundColor: Color(theme.color).fade(0.95) }} className={clsx(classes.keyPoints, classes.priceContent)}>
                        {priceContent}
                    </Typography></Paper>
                </Box>}
                {ctaText && <Box display="flex" justifyContent="center">
                    <Button type="button" style={{ backgroundColor: theme.color }} component="button" variant="contained" classes={{ root: classes.registerBtnRoot }} disableRipple onClick={() => onCTAClick()}>
                        {ctaText}
                    </Button>
                </Box>}
            </CardContent>
        </Card >

    )
}
