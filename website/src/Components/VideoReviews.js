import React from 'react';
import { Button, Grid, Container, Paper, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Title from './Title';
import SwipeableViews from 'react-swipeable-views';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
let styles = (theme) => {
  return {
    root: {
      background: '#fff',
      padding: '3rem',
      [theme.breakpoints.down('sm')]: {
        padding: '40px 16px',
        '& .MuiContainer-root': {
          padding: '0'
        }
      }
    },
    paperRoot: {
      height: '100%',
      background: '#5877CF',
      overflowY: 'auto'
    },
    title: {
      color: '#fff'
    },
    subtext: {
      paddingTop: 10,
      color: '#fff'
    },
    body: {
      paddingTop: 8,
      fontStyle: 'italic',
      color: '#fff'
    },
    innerPaper: {
      padding: 20
    },
    nextIcon: {
      fontSize: 20,
      right: '0%',
      top: '45%',
      color: '#315CD5',
      position: 'absolute',
      '&:hover': {
        background: 'transparent'
      },
      [theme.breakpoints.down('sm')]: {
        top: 'calc(100% - 60px)',
      },
    },
    prevIcon: {
      fontSize: 20,
      top: '45%',
      left: "0%",
      color: '#315CD5',
      position: 'absolute',
      transform: 'rotate(180deg)',
      '&:hover': {
        background: 'transparent'
      },
      [theme.breakpoints.down('sm')]: {
        top: 'calc(100% - 60px)',
      },
    },
    reviewsSection: {
      position: "relative",
      height: "100%",
      [theme.breakpoints.down('sm')]: {
        height: '660px'
      },
      '& .reviewSection1': {
        height: '340px',
        [theme.breakpoints.down('sm')]: {
          height: '280px'
        }
      },
      '& .reviewSection2': {
        height: '340px',
        [theme.breakpoints.down('sm')]: {
          height: '280px',
        }
      }
    },
  }
}

const AutoPlaySwipeableViews = SwipeableViews;


const Review = ({ classes, typeArr, currMaxStep, activeStep, setActiveStep }) => {

  let stepFlag = 1;

  function handleNext() {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  }

  // function onHover(step) {
  //   stepFlag = 0;

  // }

  function handleBack() {
    setActiveStep(
      (prevActiveStep) => {
        return prevActiveStep - 1
      });
  }

  function handleStepChange(step) {
    if (stepFlag === 1 && step < currMaxStep) {
      setActiveStep(step);
    }
  }
  // function myStopFunction() {
  //   stepFlag = 1;
  // }




  return (
    <Grid className={classes.root}>
      <Container>
        <Title color="#000" title="Hear from our Happy and Satisfied clients" lineVisible='none' />
        {typeArr.map((step1, index1) => (
          <span key={index1} type={step1.trackTitle} className="tabs-all" style={{ display: index1 === 0 ? 'block' : 'none' }}>
            <AutoPlaySwipeableViews
              index={activeStep}
              onChangeIndex={handleStepChange}
            >
              {step1.reviews.map((step, index) => (
                <div key={index} className={classes.reviewsSection} >
                  <div type={step.type} style={{ overflow: 'hidden' }}>
                    <Grid className={classes.root}>
                      <Container>
                        <Grid container justify="center" spacing={6}>
                          <Grid item xs={12} sm={6} className={'reviewSection1'}>

                            <iframe title="videoFrame" width="100%" height="100%" src={step.videoPath} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ background: "#000" }}></iframe>
                          </Grid>
                          <Grid item xs={12} sm={6} className={'reviewSection2'}>
                            <Paper className={classes.paperRoot}>
                              <div className={classes.innerPaper}>
                                <Typography variant="h4" className={classes.title}>
                                  {step.label}
                                </Typography>
                                <Typography variant="body1" className={classes.subtext}>
                                  {step.title}
                                </Typography>
                                <Typography variant="body1" className={classes.body}>
                                  {step.aboutHim}
                                </Typography>
                              </div>
                            </Paper>

                          </Grid>

                        </Grid>
                      </Container>
                    </Grid>

                  </div>
                  <Button size="small" onClick={handleBack} disabled={activeStep === 0} className={classes.prevIcon + ' btnss'} fontSize="large" >
                    <PlayCircleFilledIcon />
                  </Button>
                  <Button size="small" onClick={handleNext} disabled={activeStep ===
                    step1.reviews.length - 1} className={classes.nextIcon + ' btnss'} style={{ fontSize: 50 }}>
                    <PlayCircleFilledIcon />
                  </Button>
                </div>
              ))}
            </AutoPlaySwipeableViews>
          </span>
        ))}
      </Container>
    </Grid>
  );
}


export default withStyles(styles)(Review);