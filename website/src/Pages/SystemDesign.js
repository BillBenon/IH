import React, { useState, Fragment } from 'react';

import { Button, Grid, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, useMediaQuery } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import FaqComponent from '../Components/FaqComponent';
import VideoReviews from '../Components/VideoReviews';
import { useTheme } from '@material-ui/core/styles';
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
      padding: '50px 14px !important',
      maxWidth: 840,
      width: '100%',
      margin: '0 auto'
    },
    input: {
      width: '90%'
    },
    secondHeading: {
      textAlign: 'center',
      fontFamily: 'Poppins',
      fontSize: 23,
      marginBottom: 0

    },
    signUpHeading: {
      height: '60px',
      color: 'white',
      textAlign: 'center',
      fontSize: 30,
      background: '#5877CF',
      padding: '10px',
      borderRadius: '10px 10px 0 0',
      fontFamily: 'Poppins'

    },
    root: {
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10
    }
  }

}

const videoReviews = [
  {
    label: 'Meet Swagatika Sarangi',
    title: 'Sr. SDE',
    aboutHim: "Swagatika,came across interviewhelp as she was trying to figure out distributed system design.She had reported multiple failures and had feedback from various interviews around system design. Having not worked in the field she had accumulated a lot of theoritical knowledge from the books and her own reading. During our first session it was clear to me that all she needed was a structure and course correction on some newbie mistakes.",
    videoPath: 'https://player.vimeo.com/video/409568677',
    titleImage: 'https://www.linkedin.com/in/sarangiswagatika/',
    titleLink: 'https://www.linkedin.com/in/sarangiswagatika/'
  }
];

const reviews = [
  {
    reviews: videoReviews
  }
];

const faq = [
  {

    question: "Q. Is it for me?",
    answer: "A. System design knowledge is a critical component in the interviewing process for software development engineers, software development managers, technical program managers and product manager. The difficulty level and the bar is different for each of these disciplines. These sessions will be held 1-on-1, therefore you do not have to worry about adjusting to the bar in a classroom setting. Our instructors will engage with you and slowly raise your bar to the required level of succession at any top-tier company.",
  }, {

    question: "Q. I have never done system design. Will I still be asked in my interviews?",
    answer: "A. We have seen mixed behavior. It is best that you ask your recruiter for the outline of your interview. In certain cases, if they refuse to give you the outline or expectation, please check our interview questionnaire. In case you cannot find the interview questions, please contact us and we will direct you.",
  }, {

    question: "Q. What is covered in the system design coaching ?",
    answer: "A. We start with a simple question to assess your gaps, followed by a feature design and finally concluding it with a large scale system design. This typically takes 4 sessions. We recommend an additional 2 sessions for practice or if you feel confident, then follow it up with a few mock interviews.",
  }, {

    question: "Q. How long is a session?",
    answer: "A. A session typically lasts for 1 hour, it typically starts with the instructor presenting a question and then followed by a discussion on requirements and solutions.",
  }, {

    question: "Q. How do we meet ?",
    answer: "A. All sessions are done online using Zoom.",
  }, {

    question: "Q. Who provides the coaching?",
    answer: "A. Coaching is provided by people who are either a current or former employee at one of the top-tier organizations like Facebook, Google and Amazon.",
  },
  {

    question: "Q. Do you have a payment plan ?",
    answer: "A. Yes, we do. Please schedule sometime on my calendar to discuss further details.",
  }

];

const sessionDetail = [
  {
    price: "800 per month",
    count: "8",
    info: ["Small classes around (10 people) ", "Learn a tried and tested framework", "Real world examples, real world solutions", "Video recording for each session", "Learn from the best - Lead by ex-Google,ex-Amazon,ex-Microsoft engineers"]
  },
  {
    price: 1600,
    count: 4,
    info: ["1-on-1 session", "Video recording for each session", "Learn a tried and tested framework", "Learn how to do single API System Design",
      "Learn how to do single feature system design", "Learn how to do Large System Design part 1", "Learn how to do Large System Design part 2"]
  },
  {
    price: "On Success Plan",
    count: "5 or more",
    info: ["Anything to make you successful"]
  }
];

const courseDescription = ["Hands-on system design", "Learn system design using our tried-and-tested framework", "Learn concepts on system design scalability",
  "Discuss seminal papers in system design"];

function SystemDesignHeader({ classes, icon, text, subtext }) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  let [activeStep, setActiveStep] = React.useState(0);
  var defaultFormValues = { firstName: 'First Name', lastName: 'Last Name', userEmail: 'Email Address' };
  const [values, setValues] = useState(defaultFormValues);
  const [isOpen, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })
  }
  
  // const handleClickOpen = () => setOpen(isOpen)

  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {};
    payload.first_name = values["firstName"];
    payload.email = values["userEmail"];
    payload.last_name = values["lastName"];
    payload.tags = ["InterestedInSystemDesign"];
    console.log(payload);
    axiosInstance.post("users", payload).then(response => {
      setOpen(true);
      setMessage("Join instructions have been sent to your email " + payload.email);
    }).catch(error => {
      setOpen(true);
      console.log("error " + error);
      setMessage("Sorry something went wrong and we will not be able to send you the questions");
    });
  }

  return (
    <Fragment>
      <h2 className="interview-heading">Getting started with Systems Design</h2>
      <h4 className="interview-description"><span>We will dive into one systems design question per session</span>
      </h4>
      <Grid className={classes.topGrid}>
        <Container>
          <div className={classes.signUpHeading}>Weekly live system design sessions</div>
          <Card className={classes.root}>
            <CardContent>
              <Grid container justify="center" spacing={12} className={classes.mainTile}>

                <Grid item xs={6} sm={6}>

                  <h2 className={classes.secondHeading}><span>Sign up for a free trial!</span></h2>

                  <form onSubmit={handleSubmit} className="formSystemDesign" noValidate autoComplete="off">
                    <TextField className={classes.input} id="filled-basic" onChange={handleChange} name="firstName" placeholder="First Name" variant="filled" />
                    <TextField className={classes.input} id="filled-basic" onChange={handleChange} name="lastName" placeholder="Last Name" variant="filled" />
                    <TextField className={classes.input} id="filled-basic" onChange={handleChange} name="userEmail" placeholder="Email Address" variant="filled" />
                    <Button
                      variant="contained"
                      className={classes.button + ' btnSignUpQuestion'}
                      type="submit">
                      Sign up
                    </Button>
                  </form>

                </Grid>
                <Grid item xs={6} sm={6}>
                  <div className={"leet_box_right course_side_text"}>
                    <ul>
                      {courseDescription.map((val, i) => (
                        <li>{val}</li>
                      ))}
                    </ul>
                  </div>
                </Grid>

              </Grid>
            </CardContent>
          </Card>
        </Container>

        <Grid className={classes.topGrid}>
          <Container className={classes.rootContainer}>
            {sessionDetail.map((value, index) => (
              <div className="leet_box system-design-session">
                <div className="leet_box_left">
                  <div className="leet_left_text">
                    <h3>{value.count} Sessions</h3>
                    <p>${value.price}</p>
                  </div>
                </div>
                <div className="leet_box_right">
                  <ul>
                    {value.info.map((val, i) => (
                      <li>{val}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}

          </Container>
        </Grid>

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
      <VideoReviews
        typeArr={reviews}
        currMaxStep={videoReviews.length}
        setActiveStep={setActiveStep}
        activeStep={activeStep}
      />

      <FaqComponent faq={faq} />
    </Fragment>
  )
}

export default withStyles(styles)(SystemDesignHeader);

