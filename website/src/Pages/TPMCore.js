import React, { Fragment } from 'react';

import { Button, Grid, Container } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import FaqComponent from '../Components/FaqComponent';

let styles = (theme) => {
}

const faq = [
  {

    question: "Q. Is it for me?",
    answer: "A. If you are a technical program manager or someone who has been a lead for a few years  or someone who has been an engineering manager/director and now is aiming for TPM position, then you have come to the right place.",
  }, {

    question: "Q. How does it work?",
    answer: "A. TPM core skills are project management, risk mitigation and  communication. We have curated a set of questions and best practices in each of these areas. The process is therefore simple, we share these questions with you and ask you to answer them using your past experiences. We give you critical feedback and coach you exposing you the  best practices in each area.",
  }, {

    question: "What does a typical timeline look like ?",
    answer: "A. It typically will take us 4-8 sessions, depending on the gap and coaching required in each area.",
  }, {

    question: "Q. How long is a session?",
    answer: "A. A session typically lasts for 1 hour, it typically starts with asking you questons in the focus area and coaching you as required.",
  }, {

    question: "Q. How do we meet ?",
    answer: "A. All sessions are done online using Zoom.",
  }, {

    question: "Q. Who provides the coaching?",
    answer: "A. Coaching is provided by people who are either a current or former employee at one of the top-tier organizations like Facebook, Google and Amazon.",
  }, {
    question: "Q. Do you. provide placement support ?",
    answer: "A. Yes we do provide placement support, please see our placement support section for more details. ",
  },
  {
    question: "Q. Do you have a payment plan ?",
    answer: "A. Yes we do, we provide a pay on success payment plan,please schedule sometime on our calendar to discuss the details",
  }

];

const sessionDetail = [
  {
    price: '1600 for 4 sessions $3000 for 8 sessions',
    count: '',
    info: ["Priortization", "Accountablity", "Communication", "Risk management", "Stakeholder management", "Dependency management", "Change management", "Ambigutiy management", "Conflict Management", "Project reterospective"]
  }
];

function SDMCoreHeader({ classes }) {
  return (
    <Fragment>
      <h2 className="interview-heading">Getting started with TPM Core</h2>
      <h4 className="interview-description"><span>Ace your TPM core interview, learn from mentors working at top tier companies like Facebook,Google and Amazon</span>
      </h4>
      <Button
        variant="contained"
        className={classes.button + ' btnRegisterInterview'}
        href="https://calendly.com/rsalota1/technical-program-manager"
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
