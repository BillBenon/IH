import React from 'react'
import {Button, Grid, Typography, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import MenuIcon from '@material-ui/icons/Check';

let styles =(theme)=>{
    return {
        root: {
            paddingTop: 100,
            [theme.breakpoints.down('sm')]: {
                height: 'auto',
            },
            marginbottom:110,
          },
          paperRootone:{
              
              textAlign: 'center',
              width: "27%",
              height: 600,
              borderradius: 5,
              margin: 35,
              //backgroundColor: "#5877CF",
              float:"left",
              padding: "56px 27px 30px 28px",
              [theme.breakpoints.down('sm')]: {
                width: "100%",
                margin: 5,
            },
          },
          paperRoottwo:{
            padding: '5% 15% 20% 10%',
            textAlign: 'left',
            width: "30%",
            height: 400,
            borderradius: 5,
            margin: 20,
            backgroundColor: "#E3EDFF",
            [theme.breakpoints.down('sm')]: {
                width: "100%",
            },
        },
        paperRoothree:{
            padding: '5% 15% 20% 10%',
            textAlign: 'center',
            width: "30%",
            height: 400,
            borderradius: 5,
            margin: 20,
            backgroundColor: "#545454",
            [theme.breakpoints.down('sm')]: {
                width: "100%",
                margin: 5,
            },
        },
        maintitle:{
        color: "#ffff",
        width:50,
        height:32,
        //fontFamily: "Roboto",
        fontstyle:"normalize",
        fontweight: "bold",
        fontsize: 24,
        },
        tbutton:{
            width:50,
            height:32,
            color:"#ffff",
            background:"#315CD5",
            borderradius: 10,
        },
          mainTile:{
              padding: '5% 0'
          },
          img:{
              height: 75
          },
          text:{
              paddingTop: 20
          },
          subtext:{
            color: "#ffff",
            width:108,
            height:13,
            //fontFamily: "Roboto",
            fontstyle:"normalize",
            fontweight: 300,
            fontsize: 10,
          },
          title:{
              //fontFamily: "Roboto",
              fontsize: 24,
              lineHeight:"46.19%",
              color: "#ffff",
          },
          subtitle:{
            //fontFamily: "Roboto",
            fontsize: 10,
            lineHeight:"146.19%",
            textAlign:"center",
            color: "#ffff",
          },
          button:{
            padding: '14px 52px',
            fontsize: 18,
            borderradius: 20,
        },
        learn:{
            //fontFamily: "Roboto",
            fontsize: 8,
            lineHeight:"132.19%",
            textAlign:"center",
            color: "#ffff",
          }, 
          list:{
            //fontFamily: "Roboto",
            fontsize: 8,
            lineHeight:"0%",
            textAlign:"center",
            color: "#ffff", 
            float:"left",
          },
          line:{
              border: "0.5px solid #FFFFFF"
          },
          check:{
              background: "#fff",
              color: "#000",
              borderRadius: '50%!important',
              width: "0.7em",
              height: "0.7em",
              padding: 2,
              margin: "2px 8px 0px 2px",
              
          }
          
    }
}


function Price({classes}) {
    return (
        <Grid className={classes.root}>
            <Container>
                
                <Grid item xs={12} sm={12} md={12} className={classes.paperRootone} style={{background:"#5877CF"}}>
                <Typography variant ="h1" className={classes.title}>
                TPM
                </Typography>
                <Typography variant ="body1" className={classes.subtitle}>
                Prepare your self for FAANG
                </Typography>
                <Button variant="contained" className={classes.button} 
                    href="https://calendly.com/rsalota1/30min"
                >
                        Get Started
                </Button>
                    <Typography variant ="body1" className={classes.learn}>
                Learn more 
                </Typography>
                <hr className={classes.line}/>
                <Typography variant ="body1" className={classes.list}>
                <MenuIcon className={classes.check}/>
                Battle tested training material
                </Typography>
                <Typography variant ="body1" className={classes.list}>
                <MenuIcon className={classes.check}/>
Behavior Q&A coaching
                </Typography>
                <Typography variant ="body1" className={classes.list}>
                <MenuIcon className={classes.check}/>
System design  1-on-1 practice 
                </Typography>
                <Typography variant ="body1" className={classes.list}>
                 <MenuIcon className={classes.check}/>
Tap into our career  network
                </Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} className={classes.paperRootone} style={{background:"#E3EDFF"}}>
                <Typography variant ="h1" className={classes.title} style={{color:"#000"}}>
                SDM
                </Typography>
                <Typography variant ="body1" className={classes.subtitle} style={{color:"#000"}}>
                Prepare yourself for FAANG
                </Typography>
                <Button variant="contained" className={classes.button} 
                    href="https://calendly.com/rsalota1/30min"
                >
                        Get Started
                </Button>
                    <Typography variant ="body1" className={classes.learn} style={{color:"#000"}}>
                Learn more  
                </Typography>
                <hr className={classes.line}/>
                <Typography variant ="body1" className={classes.list} style={{color:"#000"}}>
                <MenuIcon className={classes.check}/>
                System design 1-on-1  practice
                </Typography>
                <Typography variant ="body1" className={classes.list} style={{color:"#000"}}>
                <MenuIcon className={classes.check}/>
                Leetcode pro in 3 months 
                </Typography>
                <Typography variant ="body1" className={classes.list} style={{color:"#000"}}>
                <MenuIcon className={classes.check}/>
                Behaviour  Q&A  coaching
                </Typography>
                <Typography variant ="body1" className={classes.list} style={{color:"#000"}}>
                 <MenuIcon className={classes.check}/>
                 Tap into our career network
                </Typography>
                </Grid>

                <Grid item xs={12} sm={12} md={12} className={classes.paperRootone} style={{background:"#545454"}}>
                <Typography variant ="h1" className={classes.title}>
                SDE
                </Typography>
                <Typography variant ="body1" className={classes.subtitle}>
                Prepare your self for FAANG
                </Typography>
                <Button variant="contained" className={classes.button} 
                    href="https://calendly.com/rsalota1/30min"
                >
                        Get Started
                </Button>
                    <Typography variant ="body1" className={classes.learn}>
                Learn more 
                </Typography>
                <hr className={classes.line}/>
                <Typography variant ="body1" className={classes.list}>
                <MenuIcon className={classes.check}/>
                System design 1-on-1 practice
                </Typography>
                <Typography variant ="body1" className={classes.list}>
                <MenuIcon className={classes.check}/>
                Leetcode pro in 3 months
                </Typography>
                <Typography variant ="body1" className={classes.list}>
                <MenuIcon className={classes.check}/>
                Make learning fun and collaborative
                </Typography>
                <Typography variant ="body1" className={classes.list}>
                 <MenuIcon className={classes.check}/>
                 Tap into our career network
                </Typography>


                </Grid>
                
            </Container>
            <Grid style={{clear:"both"}}></Grid>
        </Grid>
    
        
    )
}

export default withStyles(styles)(Price)
