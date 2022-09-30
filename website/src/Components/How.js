import React from 'react'
import {  Grid, Typography, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

import Title from './Title';



let styles =(theme)=>{
    return {
        mainRoot:{
            padding: '3% 0% 5%',
            
        },
        root:{
            textAlign: 'center',
            paddingTop: 30,
            minHeight: 300,
            paddingRight: "54px",
            paddingLeft: "54px",
            [theme.breakpoints.down('sm')]: {
                margin: 0,
                paddingRight: "0px",
            paddingLeft: "0px",
            },
        },
        newcntent: {
         margin: "-35px",
         [theme.breakpoints.down('sm')]: {
            margin: 0,
        },
        },
        number:{
            fontWeight: 500,
            fontSize: 100,
            color: '#F3F2F2'
        },
        icons:{
            marginLeft: -20
        },
        subtext:{
            paddingRight: 0,
            width: 224,
            alignSelf: "center",
            [theme.breakpoints.down('sm')]: {
                alignSelf: 'center',
                width: "100%",
                paddingRight: 24,
            },
            
        },
        mainContent:{
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                alignSelf: 'center',
            },
        },
        top:{
            alignSelf: 'top',
            [theme.breakpoints.down('sm')]: {
                alignSelf: 'start',
            },
        },
        bottom:{
            alignSelf: 'flex-end',
            [theme.breakpoints.down('sm')]: {
                alignSelf: 'start',
            },
        }

    }
}

function Item({classes, num, imgSrc, title, subtext}) {
    return (
        <Grid container className={classes.mainContent} alignItems="center">
            <Grid item className={classes.newcntent}>
                <div className={classes.mycntent}>
                    <span className={classes.number}>{num || 1}</span>
                    <img src={imgSrc} className={classes.icons} alt=""/> 
                </div>
                <Typography variant="h5"> {title}</Typography>
                <Typography variant="body1" className={classes.subtext}> {subtext}</Typography>
            </Grid>
        </Grid>

    )
}

function How({classes, hows}) {
    return (
        <Container>
        <Grid container className={classes.mainRoot}>
            <Grid item xs={12}>
            <Title lineTheme='lineYellow' title="How it works"/>
            </Grid>
            <Grid container className={classes.root}>
                {hows.map((item, i)=>(
                    <Grid item xs={6} md="true"  className={ (i+1)%2 ?classes.top: classes.bottom} >
                        <Item 
                            imgSrc={item.icon} 
                            num={i+1} 
                            classes={classes} 
                            title={item.title}
                            subtext={item.subtext}
                        />
                    </Grid>
                ))}
            </Grid>
        </Grid>
        </Container>
    )
}

export default withStyles(styles)(How)
