import React from 'react'
import { withStyles } from '@material-ui/styles';
import { Grid, Typography, Container  } from '@material-ui/core';
import firstIcon from '../assets/offer/Capture2.PNG';
import secondIcon from '../assets/offer/vector2.png';
import thirdIcon from '../assets/offer/Capture1.PNG';

let styles =(theme)=>{
    return {
        root:{
            marginBottom: 10,
            clipPath: 'polygon(0 0, 100% 20%, 100% 100%, 0 80%)',
            backgroundColor: '#315CD5',
            backgroundSize: 'cover',
            padding: '7% 0% 10%',
            textAlign: 'center',
            [theme.breakpoints.down('xs')]: {
                clipPath: 'none',
                padding: '7% 10% 15%',
            },
        },
        subtext:{
            color: '#fff',
            padding: '0 40px'
        },
        title:{
            color: '#fff',
            padding: 40
        },
        img:{
            width:200
        }
    }
}
  

function Offer({classes}) {
    return (
        <Grid alignItems="center" className={classes.root} container>
            <Grid item xs={12}>
                <Typography variant='h2'className={classes.title} > What we can offer you!</Typography>
            </Grid>
            <Grid item xs={12}>
                <Container>
                    <Grid container>
                        <Grid item xs={12} sm={4}> 
                            <img src={firstIcon} alt="" className={classes.img} />
                            <h3 className={classes.subtext}>Only get candidates that meet your bar</h3>
                        </Grid>
                        <Grid item xs={12} sm={4}> 
                            <img src={secondIcon} alt="" className={classes.img} />
                            <h3 className={classes.subtext}>Showcase your team and their passion</h3>
                        </Grid>
                        <Grid item xs={12} sm={4}> 
                            <img src={thirdIcon} alt="" className={classes.img} />
                            <h3 className={classes.subtext}>FREE, looking for pilot partners</h3>
                        </Grid>
                    </Grid>
                </Container>
            </Grid>
        </Grid>
    )
}

export default withStyles(styles)(Offer)
