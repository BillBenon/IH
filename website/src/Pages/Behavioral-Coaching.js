import { Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Typography, useMediaQuery } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import React, { Fragment, useState } from 'react';
import FaqComponent from '../Components/FaqComponent';
import axiosInstance from '../utils/axiosInstance';

let styles = (theme) => {

  return {
    paperRoot: {
      padding: '50px 30px 30px',
      textAlign: 'center',
      height: '220px',
      borderRadius: '15px',
      background: '#5877CF'
    },
    img: {
      width: 75,
      height: 75
    },
    text: {
      fontFamily: 'Poppins',
      color: 'white',
      paddingTop: 20
    },
    subtext: {
      paddingTop: 25,
      color: 'white',
      fontFamily: 'Poppins',
      fontSize: 25
    },
    topGrid: {
      padding: '50px 14px !important'
    },
    input: {
      width: '90%',

    },
    secondHeading: {
      textAlign: 'center',
      fontFamily: 'Poppins',
      fontSize: 23

    }
  }

};

const session = [
  {
    price: 500,
    count: 1
  },
  {
    price: 1600,
    count: 4
  },
  {
    price: 3000,
    count: 8
  },
  {
    price: "0 + On Success Plan",
    count: 8
  },

];

const faq = [
  {

    question: "Q. Is it for me?",
    answer: 'A. Every interview whether it be technical or non-technical, will have a component in behavior interviews. The idea is that "past behavior is a strong indicator of present behavior.” Therefore, if you are planning on conducting an interview, then this is a very critical aspect to become skillful at.',
  }, {

    question: "Q. What kind of questions are asked in behavior interviews?",
    answer: "A. The questions are generally very open-ended—there is no right or wrong answer to these questions, but there are definitely some guide lines. The guidelines change from organization to organization and sometimes even from person to person. The biggest problem with these questions is that if you have a blind spot, you could be spinning wheels for a long time before either you or the interviewer become aware of it. Another possible scenario is if the interviewer or you do not see it as a “red flag,” someone else will. We will help identify these “red flags” so you can be more well rounded.",
  }, {

    question: "Q. How does your coaching process work?",
    answer: "A. Our coaching process is unique in the sense that we have studied various interviews and have curated a list of questions. You are expected to answer around 40 questions with relevant life stories and experiences. We then go over your responses with you and provide you with insightful feedback in our 1-on-1 sessions.",
  }, {

    question: "Q. How much time does it take?",
    answer: "A. Typically it takes 4 hours to review all your answers and provide feedback. We recommend that you then enroll in a few mock interviews to button things up.",
  }, {

    question: "Q. What is your success rate?",
    answer: "A. We have seen a 90% success rate with people who have gone through our entire program. We do not currently have metrics on people who have only taken 1 or 2 sessions with us.",
  },
  {
    question: "Q. Do you have a payment plan?",
    answer: 'A. Yes, we do, please connect with us to discuss details.',
  }

];




const Tile = ({ classes, price, count }) => (
  <Paper className={classes.paperRoot}>
    <Typography variant="h2" className={classes.text}>
      {count} Session(s)  </Typography>
    <Typography variant="h2" className={classes.subtext}>
      $ {price}
    </Typography>
  </Paper>
);

function InterviewHeader({ classes, icon, text, subtext }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  var defaultFormValues = { firstName: 'First Name', lastName: 'Last Name', userEmail: 'Email Address' };
  const [values, setValues] = useState(defaultFormValues);
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }

  // const handleClickOpen = () => {
  //   setOpen(isOpen);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {};
    payload.first_name = values["firstName"];
    payload.email = values["userEmail"];
    payload.last_name = values["lastName"];
    payload.tags = ["InterestedInBehaviorCoaching"];
    console.log(payload);
    axiosInstance.post("users", payload).then(response => {
      console.log(response);
      setOpen(true);
      setMessage("Questions have been sent to " + payload.email);

    }).catch(error => {
      setOpen(true);
      setMessage("Sorry something went wrong and we will not be able to send you the questions");
    });
  }


  return (
    <Fragment>
      <h2 className="interview-heading">Getting started with Behavioral Coaching</h2>
      <h4 className="interview-description"><span>View the questions and prepare answers for our session(s). We will provide feedback on</span>
        <span>what you can improve on. You can choose how many session(s) you would like to have.</span></h4>
      <Grid className={classes.topGrid}>
        <Container>
          <Grid container justify="center" spacing={12} className={classes.mainTile}>
            <Card className={classes.root}>
              <CardContent>
                <h2 className={classes.secondHeading}><span>View the Questions for Free!</span></h2>
                <form className="questionsForm" noValidate autoComplete="off" onSubmit={handleSubmit}>
                  <TextField className={classes.input} id="filled-basic" name="firstName" onChange={handleChange} placeholder={"First Name"} variant="filled" />
                  <TextField className={classes.input} id="filled-basic" name="lastName" onChange={handleChange} placeholder={"Last Name"} variant="filled" />
                  <TextField className={classes.input} id="filled-basic" name="userEmail" onChange={handleChange} placeholder={"Email Address"} variant="filled" />
                  <Button
                    variant="contained"
                    className={classes.button + ' btnseequestion'}
                    type="submit"
                  >
                    See Questions
                            </Button>
                </form>
              </CardContent>
              <CardActions>
              </CardActions>
            </Card>
          </Grid>
        </Container>
      </Grid>

      <div>
        <Dialog
          fullScreen={fullScreen}
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Thanks for expressing interest</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {message}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary" autoFocus>
              Thanks
              </Button>
          </DialogActions>
        </Dialog>
      </div>

      <Grid className={classes.topGrid}>
        <Container>
          <Grid container justify="center" spacing={6} className={classes.mainTile}>
            {session.map((item, i) => (
              <Grid key={i} item xs={6} sm={3}>
                <Tile classes={classes} {...item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Grid>
      <FaqComponent faq={faq} />
    </Fragment>
  )
}

export default withStyles(styles)(InterviewHeader);
