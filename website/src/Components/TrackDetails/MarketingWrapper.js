import {
    Card, CardContent, CardHeader, Grid, makeStyles,
    Typography
} from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    mobileGridItem: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: "0px !important",
            marginBottom: "0px !important"
        }
    },
    container: {
        '& .MuiGrid-item': {
            [theme.breakpoints.down('sm')]: {
                margin: '0 !important',
                padding: '0 !important',
            }
        },
        '& .MuiCardContent-root': {
            [theme.breakpoints.down('sm')]: {
                padding: "0px !important"
            }
        }
    },
    trackTitle: {
        fontWeight: "bold",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textTransform: "uppercase",
        [theme.breakpoints.only('xs')]: {
            fontSize: "16px"
        }
    },
    centerAligned: {
        display: "flex",
        justifyContent: "center"
    },
}));

export const MarketingWrapper = ({ title, children }) => {
    const classes = useStyles();
    return (
        <Grid item className={classes.mobileGridItem} xs={12}>
            <Card className={classes.container}>
                <CardHeader
                    title={<Typography variant="h5" className={clsx(classes.trackTitle, classes.centerAligned)}>{title}</Typography>}
                />
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Grid>
    )
}
