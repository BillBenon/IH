import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Container } from '@material-ui/core';
import 'react-vertical-timeline-component/style.min.css';
import FaqComponent from './FaqComponent';

let styles = (theme) => {
  return {
    root: {
      background: '#E3EDFF',
      padding: 30,
      margin: 10,
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },

    },
    root1: {
      background: '#fafafa',
      margin: 10,
      [theme.breakpoints.down('sm')]: {
        padding: 0,
      },
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
    price_box: {
      width: '100%',
      boxShadow: '0 4px 4px rgba(0,0,0,0.25)',
      margin: '0 auto 60px',
      overflow: 'hidden',
      background: '#5877CF',
      height: '220px',
      color: 'white',
      textAlign: 'center',
      fontSize: '35px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },

    price_box_text: {
      fontFamily: 'Poppins'
    },
    rootContainer: {
      position: 'relative',
      maxWidth: '800px'
    }
  }
}

function InterviewFaq({ classes, faq, data }) {

  return (
    <React.Fragment>
      <div className={classes.price_box}>
        <p className={classes.price_box_text}>${data.price}/Session</p>
      </div>
      <Grid className={classes.root1}>
        <h2 className="mock-interview-title">Mock Interview Example</h2>
        <h4 className="interview-description"><span>{data.faqSubHeading}</span></h4>
        <div className='embed-container'>
          <iframe title="interviewVideo" className={classes.videoFrame} width="100%" height="100%" src={data.video} frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen ></iframe>
        </div>
        <Container className={classes.rootContainer}>


        </Container>
      </Grid>
      <FaqComponent faq={faq} />

    </React.Fragment>
  );
}

export default withStyles(styles)(InterviewFaq);
