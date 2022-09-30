import React, { Fragment } from 'react'
import image from '../assets/testimonial/rahul.jpeg'
import { Grid, Typography, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';


let styles =(theme)=>{
    return {
        root:{
            padding: '5% 0% 15%',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        text:{
            lineHeight: '214.19%',
            fontStyle: 'italic'
        },
        buffer:{
            marginTop: -400,
            marginBottom: -320,
            background: '#E3EDFF',
            height: 527,
            clipPath: 'polygon(0 30%, 100% 0, 100% 100%, 0% 100%)',
            [theme.breakpoints.down('sm')]: {
                display:'none'
              },

        },
        imageContainer:{
            [theme.breakpoints.down('sm')]: {
                textAlign: 'center',
              },
            '& img':{
                padding: 10,
                width: 400,
                background: '#fff',
                borderRadius: '50%',
                position: 'relative',
                zIndex: '100',
                [theme.breakpoints.down('sm')]: {
                    width: 'auto',
                  },
            },
        }
    }
}

function Testimonial({classes}) {
    return (
        <Fragment>
            <Container>
                <Grid container className={classes.root}>
                    <Grid item xs={12} sm={6}>
                        <Typography variant="h5" className={classes.text}>
                            “Organizations and candidates should be self aware and transparent about their hiring bar and capabilities to allow for optimized and transparent recruiting”
                        </Typography>
                        <Typography variant="body1" className={classes.subtext}>
                        Rahul Salota, CEO 
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <div className={classes.imageContainer}>
                            <img src={image} className={classes.img} alt="" />
                        </div>            
                    </Grid>
                </Grid>
            </Container>
            {/* buffer div */}
            <div className={classes.buffer}></div>
        </Fragment>
    )
}

export default withStyles(styles)(Testimonial)
