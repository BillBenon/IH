import React, { Fragment } from 'react';

import { Button, Grid, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import FaqComponent from '../Components/FaqComponent';

let styles = (theme) => {
}

const faq = [
  {

    question: "Q. Is it for me?",
    answer: "A.  If you are a software development manager at an existing company and are looking to move then this is for you.",
  }, {

    question: "Q. How does it work?",
    answer: "A. For SDM interviews the most important thing are manager core skills. These are hardest to reason about because there are no wrong or right answers but rather a scale of it. In order to solve this problem we have carefully selected a set of questions, that make you think and bring out life experience stories from you. We then assign you a mentor who will carefully go over your stories and give you critical feedback. The best thing about this process is that it makes you aware of your blindspots , provides  gaps , best practices and most importantly aligns culture. The other part of the interview is technical essentially System design and Coding. We have 1-on-1 system design sessions and easy and medium coding courses that can build up your skill in < 1 month.",
  }, {

    question: "Q. What does a typical timeline look like?",
    answer: "A. We suggest to start inter facing with us as soon as you have decided to move from your current organization and then give your 100% and let the process do its work. Typically it should not take more than 2 months to get prepared if you are currently working.",
  }, {

    question: "Q. Can you share questions that were asked in top tier organizations?",
    answer: "A. Yes, we can. We keep track of bar at various organizations and what their sample loop looks like. This is a community effort but very controlled so that we only get genuine questions asked at these interviews. In order to make this fair we charge $100 upfront and refund you the money when you provide your interview experiences.",
  }, {

    question: "Q.How are the sessions conducted?",
    answer: "A. All sessions are done online using Zoom.",
  }, {

    question: "Q. What is the success rate of your program?",
    answer: "A. We have 100% success, till date we haven't seen a failure. All we expect you to do is put your 100% in. This metrics does not include candidates who have come in for one or 2 mock interviews.",
  }, {

    question: "Q. Do you offer just mock interviews ?",
    answer: "A. Yes we do. The cost of mock interviews depends on level  and. organization of the engineering manager.",
  }

];

const sessionDetail = [
  {
    price: '1600',
    count: '4',
    info: ["People management", "Project management", "Cross functional collaboration", "Stakeholder management", "Product management", " Project Retrospective"]
  },
];

function SDMCoreHeader({ classes }) {
  return (
    <Fragment>
      <h2 className="interview-heading">Getting started with SDM Core</h2>
      <h4 className="interview-description"><span>Learn managerial core skills from the best in the industry and nail your next interview</span>
      </h4>
      <Button
        variant="contained"
        className={classes.button + ' btnRegisterInterview'}
        href=""
      >
        Register
        </Button>
      <Grid className={classes.root1}>
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
      <FaqComponent faq={faq} />
    </Fragment>
  )
}

export default withStyles(styles)(SDMCoreHeader);
