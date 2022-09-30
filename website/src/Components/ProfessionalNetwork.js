import React, { Fragment } from "react";
import { makeStyles, Typography } from "@material-ui/core";
import AirbnbPng from '../assets/brands/airbnb.png';
import AmazonPng from '../assets/brands/amazon.png';
import ApplePng from '../assets/brands/apple.png';
import FacebookPng from '../assets/brands/facebook.png';
import MicrosoftPng from '../assets/brands/microsoft.png';
import UberPng from '../assets/brands/uber.png';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const brands = [
    MicrosoftPng, AmazonPng, UberPng, FacebookPng, AirbnbPng, ApplePng
];

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#fff',
        width: '100%',
        padding: '3rem',
        [theme.breakpoints.down('sm')]: {
            padding: '40px 16px'
        }
    },
    heading: {
        fontSize: '2rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.7rem',
        }
    },
    imageContainer: {
        overflow: 'auto',
        width: '100%',
        marginTop: '3rem',
        textAlign: 'center',
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        },
    },
    imageSlider: {
        whiteSpace: 'nowrap',
        padding: '1rem'
    },
    images: {
        display: 'inline-block',
        marginRight: '5rem',
    },
    mobileViewContainer: {
        display: 'none',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        },
        '& .mobileImages': {
            display: 'inline-block',
            padding: '2rem',
            background: 'white',
        },
        '& .carousel .slide': {
            backgroundColor: 'white'
        },
        '& .carousel .control-dots': {
            position: 'relative',
            margin: '0',
            '& .dot':{
                background: '#000',
                opacity: '0.4',
                boxShadow: 'none'
            },
            '& .dot.selected': {
                background: '#000',
                opacity: '1'
            }
        }
    },
}));


export default function ProfessionalNetwork() {
    const classes = useStyles();

    return (
        <Fragment>
            <div className={classes.root}>
                <Typography variant="h4" align="center" className={classes.heading}>
                    {'Our professional network'}
                </Typography>
                <div className={classes.imageContainer}>
                    <div className={classes.imageSlider}>
                        {brands.map((brand, index) => (
                            <div key={index} className={classes.images}>
                                <img alt='' src={brand}></img>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.mobileViewContainer}>
                    <Carousel 
                    showArrows={false} 
                    showThumbs={false} 
                    showStatus={false} 
                    swipeable={true} 
                    emulateTouch={true}
                    autoPlay={true}
                    infiniteLoop={true}>
                        {brands.map((brand, index) => (
                            <div key={index} className="mobileImages">
                                <img alt='' src={brand}></img>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div>
        </Fragment>
    );
}