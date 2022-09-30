import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Card, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles, Paper, Tooltip, Typography, Link } from '@material-ui/core'
import MoreHoriz from '@material-ui/icons/MoreHoriz'
import Color from 'color'
import React from 'react'
import { colorsArray, TrackDetailConsts } from '../../utils/Constants'
import { MarketingWrapper } from './MarketingWrapper'
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const useStyles = makeStyles((theme) => ({
    capabilityWrapper: {
        justifyContent: "center",
    },
    capabilityCard: {
        [theme.breakpoints.down('sm')]: {
        }
    },
    container: {
        [theme.breakpoints.down('sm')]: {
            margin: "15px 30px !important",
        },
        '& .MuiGrid-item': {
            [theme.breakpoints.down('sm')]: {
            }
        },
        '& .MuiCardContent-root': {
            [theme.breakpoints.down('sm')]: {
            }
        }
    },
    capabilityBox: {
        height: "20rem",
    },
    priceList: {
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
        color: "#545454"
    },
    showMoreText: {
        display: "flex",
        justifyContent: "center",
    },
    categoryHeader: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "0",
        height: "2.5rem",
    },
    matIcon: {
        height: "20px !important",
    },
}));
export const Categories = ({ categories, onShowMoreCapability }) => {
    const classes = useStyles();

    return (
        <MarketingWrapper title={"You will be coached IN"}>
            <Grid container spacing={2} className={classes.capabilityWrapper}>
                {categories.map((category, inx) => {
                    return <Grid item xs={12} sm={6} md={4}>
                        <Card className={classes.container}>
                            <CardContent className={classes.capabilityBox}>
                                <Paper style={{ backgroundColor: colorsArray.length > inx + 1 ? Color(colorsArray[inx]).fade(0.90) : "#ccc" }} variant="outlined" square={true} className={classes.categoryHeader}><h3>{category.categoryName}</h3></Paper>
                                <List className={classes.priceList}>
                                    {category.capabilities.filter((i, index) => index < TrackDetailConsts.MaxCapability).map((c, i) => <ListItem key={c.capabilityDescription}>
                                        <ListItemIcon className={classes.listItemIcon}>
                                            <FontAwesomeIcon icon={faCheck} size='1x' color={colorsArray.length > inx + 1 ? Color(colorsArray[inx]) : "#ccc"} />
                                        </ListItemIcon>
                                        <ListItemText primary={
                                            <Tooltip title={c.capabilityDescription && <Typography paragraph dangerouslySetInnerHTML={{ __html: c.capabilityDescription }}></Typography>}>
                                                <Typography className={classes.planCheckList}>{c.capabilityText}</Typography>
                                            </Tooltip>}>
                                        </ListItemText>
                                    </ListItem>)}
                                    {category.capabilities.length > TrackDetailConsts.MaxCapability && <Typography className={classes.showMoreText}>
                                        <Link href="javascript:void(0);" onClick={() => onShowMoreCapability(category)}>{/*eslint-disable-line */}
                                            <MoreHoriz classes={{ root: classes.matIcon }} />
                                        </Link>
                                    </Typography>}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                })}
            </Grid>
        </MarketingWrapper >
    )
}
