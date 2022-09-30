import React, { Fragment } from 'react';
import InterviewFaq from '../Components/InterviewFaq';

import { Button, Grid, Typography, Container, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import behaviour from '../assets/track-icon/icon-mind.svg'
import design from '../assets/track-icon/icon-interview-system-design.svg'
import code from '../assets/track-icon/icon-interview-code.svg'

let styles = (theme) => {

    return {
        paperRoot: {
            padding: '50px 30px 30px',
            textAlign: 'center',
            height: 300
        },

        img: {
            width: 75,
            height: 75
        },
        text: {
            fontFamily: 'Poppins',
            color: '#000000',
            paddingTop: 20
        },
        subtext: {
            paddingTop: 25,
            color: '#989898',
            fontFamily: 'Poppins',
            fontSize: 17
        },
        topGrid: {
            padding: '50px 14px !important'
        }
    }

}

const TILES = [
    {
        icon: behaviour,
        text: "TPM CORE",
        subtext: "Identify your gaps in risk mitigation, stakeholder, & management."
    },
    {
        icon: code,
        text: "BEHAVIOUR",
        subtext: "Refine your skills as a manager."
    },
    {
        icon: design,
        text: "SYSTEM DESIGN",
        subtext: "Learn to identify system design patterns."
    }
];

const interviewTPMFaq = [
    {

        question: "Q. What areas do you cover in a mock interview?",
        answer: "A. We cover the following domains: Software Development Engineer (SDE), Software Development Manager (SDM) and Technical Program Manager (TPM). We cover all areas in each of these domains including behavior, coding, system design, TPM core, and SDM core.",
    }, {

        question: "Q. What's cool about interviewhelp.io mock interviews?",
        answer: "A. Mock interviews are held in efforts of polishing you. You will interview with industry experts at top-tier companies and they will provide you with insights on your gaps and give you suggestions on how you can improve them. We have designed various courses that will help you overcome these gaps. In other words, we will not only tell you what your gaps are, but also provide a tried and tested solution to quickly overcome them.",
    }, {

        question: "Q. How do mock interviews work?",
        answer: "Step 1 - Get introduced to interviewers. We'll first match you with interviewers from Google, Facebook or an equivalent company based on your specific situation. Step 2 - Interview is conducted online. Interviews (~1h) will be exactly the same as real interviews and are conducted online via zoom with the help of code-sharing tools or draw.io as required. Step 3 - Get real feedback and potential solutions. Step 4 - We will send you a recording of your session that you can revisit and re-evaluate.",
    }, {

        question: "Q. What kind of feedback will I get at the end of the mock interview?",
        answer: "A. There's no general answer to this question because the mock interview service is highly personalized, so different candidates will receive different feedback. The result will vary case by case. In general, the interviewer will comment on your overall performance. Most importantly, they will point out your shortcomings (if any) and provide advice on how to be better prepared. Within 24 hours, you will receive an email with a detailed feedback, including your scores. We strongly encourage candidates to share their concerns or questions at the end of the interview, so it's a good idea to come well prepared with some questions before the mock interview.",
    }, {

        question: "Q. I'm not ready yet, should I take a mock interview?",
        answer: "A. No, you should not. Mock interviews are expensive. Please use them when you are ready and need polishing. The objective here is not for you to realize that you don't know dynamic programming in the mock interview, but rather, that you have small but critical gaps that can make or break the interview.",
    }, {

        question: "Q. What is the advance notice period to schedule a mock interview?",
        answer: "A. We have arranged interviews within 48 hours, but please feel free to give us a call and we will try our best to align something up ASAP.",
    },
    {
        question: "Q. What types of interview does interviewhelp.io provide?",
        answer: "A. Right now we provide general coding interviews and system design interviews, which work for almost all tech companies, especially big ones like Google, Facebook, Amazon, Linkedin, Microsoft, etc. If you have been in some tech interviews, you will realize how similar these interviews are across the tech industry. For those top companies, the interview process is extremely standard: you will go through the same type of interview no matter what position you are applying for. That is exactly what we focus on.",
    },
    {
        question: "Q. How does interviewhelp.io protect my privacy?",
        answer: "A. interviewhelp.io cares about the privacy of both interviewers and candidates. For candidates, no information, including resume and interview results, will be shared outside our network without your permission.",
    },
    {
        question: "Q. What is the rescheduling/cancellation policy?",
        answer: "A. As a tech community, we are professionals and we hold a minimum expectation from everyone, however life happens and we are considerate about it and we expect you to be the same with our instructors. Having said, we will not charge you if the session did not start, even if it is a few minutes before the session. However, if our policy is abused, then we will politely decline to serve you on our platform."
    }


];

const data = {
    price: 500,
    video: "https://player.vimeo.com/video/411183874",
    faq: interviewTPMFaq,
    faqSubHeading: "Watch how our TPM mock interviews are conducted."
}

const Tile = ({ classes, icon, text, subtext }) => (
    <Paper className={classes.paperRoot}>
        <img src={icon} alt="" className={classes.img} />
        <Typography variant="h5" className={classes.text}>
            {text}
        </Typography>
        <Typography variant="body1" className={classes.subtext}>
            {subtext}
        </Typography>
    </Paper>
)
function InterviewHeader({ classes, icon, text, subtext }) {
    return (
        <Fragment>
            <h2 className="interview-heading">Getting started with Mock Interviews</h2>
            <h4 className="interview-description"><span>We will evaluate how well you performed in the mock interview(s) and</span>
                <span>provide insights on what you can improve on.</span></h4>
            <Button
                variant="contained"
                className={classes.button + ' btnRegisterInterview'}
                href="https://calendly.com/tpm-team/schedule-a-mock-interview"
            >
                Register
        </Button>

            <h4 className="track-type-description"><span>The Technical Program Manager (TPM) track includes three topics you can choose from when scheduling a mock interview:</span></h4>
            <Grid className={classes.topGrid}>
                <Container>
                    <Grid container justify="center" spacing={6} className={classes.mainTile}>
                        {TILES.map((item, i) => (
                            <Grid key={i} item xs={6} sm={3}>
                                <Tile classes={classes} {...item} />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Grid>
            <InterviewFaq faq={interviewTPMFaq} data={data} />
        </Fragment>
    )
}

export default withStyles(styles)(InterviewHeader);
