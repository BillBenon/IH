import React, { useState, useEffect } from 'react'
import { Button, Grid, Typography, Container } from '@material-ui/core'
import { withStyles } from '@material-ui/styles';
import backgroundLogo from '../assets/Banner/HowBackgroundNew.svg'
import ReactGA from 'react-ga';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViewsBanner = autoPlay(SwipeableViews);


let styles = (theme) => {
    return {
        root: {
            background: `url(${backgroundLogo}) no-repeat right`,
            backgroundColor: '#f9f9f9',
            height: 450,
            backgroundSize: 'cover',
            paddingTop: 85,
            [theme.breakpoints.down('sm')]: {
                background: `url(${backgroundLogo}) no-repeat left`,
            },
        },
        titlemain: {
            marginleft: 30,
        },
        subtext: {
            color: '#fff',
            padding: '26px 0px 13px 0px',
            marginleft: 20,
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '18px'
        },
        button: {
            padding: '6px 10px',
            marginleft: 20,
            backgroundColor: '#E25252',
            borderRadius: '13px',
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 'bold'
        },
        img: {
            width: 420,
            marginLeft: 120,
        },
        imgContainer: {
            [theme.breakpoints.down('sm')]: {
                display: 'none'
            },
        },
        text: {
            color: '#fff',
            marginleft: 20,
            paddingTop: 55,
            fontFamily: 'Poppins',
            fontStyle: 'normal',
            fontWeight: 'bold'
        }
    }

}


function Banner({ classes, configuration }) {
    let [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        ReactGA.initialize('UA-152900192-1', 'auto');
        ReactGA.pageview(window.location.pathname + window.location.search)
    }, []);

    const handleClick = () => {
        ReactGA.event({
            category: 'Button',
            action: 'User pressed register for a free session button on homepage'
        })
    };

    const handleStepChange = () => {
        if ((activeIndex + 1) >= configuration.length) {
            console.log("resetting" + activeIndex);
            setActiveIndex(0);
            console.log("new index" + activeIndex);
        } else {
            console.log("changing" + activeIndex);
            setActiveIndex(activeIndex + 1);
            console.log("new index" + activeIndex);

        }
    }


    return (
        <AutoPlaySwipeableViewsBanner
            index={activeIndex}
            onChangeIndex={handleStepChange}
            interval='4000'>
            {
                configuration.map((config, activeIndex) => (
                    <Grid container className={classes.root}>
                        <Container>
                            <Grid container>
                                <Grid item xs={12} sm={6} md={5}>
                                    <Typography variant="h1" className={classes.text}>
                                        {config.title}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        className={classes.subtext}
                                    >
                                        {config.subtext}
                                    </Typography>

                                    <Button
                                        variant="contained"
                                        className='btnRegisterInterview homeRegisterButton'
                                        href={config.link}
                                        onClick={handleClick}
                                    >
                                        {config.btntext || 'Register now!'}
                                    </Button>
                                </Grid>

                                <Grid item xs={12} sm={7} className={classes.imgContainer}>
                                    <img src={config.bannerLogo} alt="" className={classes.img} />
                                </Grid>
                            </Grid>

                        </Container>
                    </Grid>
                ))}
        </AutoPlaySwipeableViewsBanner>
    )
}

export default withStyles(styles)(Banner)
