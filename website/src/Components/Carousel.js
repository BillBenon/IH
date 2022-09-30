import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';
import calibIcon from '../assets/track-icon/icon-calibration.svg';
import codeIcon from '../assets/track-icon/icon-code.svg';
import sysIcon from '../assets/track-icon/icon-system-design.svg';
import interviewIcon from '../assets/track-icon/icon-mock-interview.svg';
import placementIcon from '../assets/track-icon/icon-placement-network.svg';
import coachingIcon from '../assets/track-icon/icon-behavioural-coaching.svg';
import managerIcon from '../assets/track-icon/icon-manager.svg';
import tpmCoreIcon from '../assets/track-icon/icon-manager.svg';
import resumeReviewIcon from '../assets/track-icon/icon-resume-review.svg';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Box from '@material-ui/core/Box';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin
} from "@fortawesome/free-brands-svg-icons";
import VideoReviews from "./VideoReviews";
import RightArrowIcon from "../assets/How/right.svg";

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      className="carousel-bordered-view"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}

    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const tpm = [
  {

    title: 'Calibration',
    description: 'Please answer some behavioral questions and schedule a 30-minute meeting to help us evaluate you and build a custom success plan designed for you.',
    icon: calibIcon,
    class: 'howIcon',
    link: 'https://rahulsalota716493.typeform.com/to/U2VBCx'
  },
  {
    title: 'Behavioral Coaching',
    description: 'Share your life experience stories and then get feedback to showcase the best about yourself.',
    icon: coachingIcon,
    class: 'howIcon',
    link: '/behavioral-coaching'
  },
  {
    title: 'TPM Core',
    description: 'Identify your gaps in risk mitigation, dependency, stakeholder, and escalation management.',
    icon: tpmCoreIcon,
    class: 'howIcon',
    link: '/tpm-core'
  },
  {
    title: 'System Design Prep',
    description: 'Learn system design in just 6 one hour sessions and nail your next interview.',
    icon: sysIcon,
    class: 'howIcon',
    link: '/system-design'
  },
  {
    title: 'Resume Review',
    description: "Get a professional resume review from TPM's at top tier companies like Facebook, Google and Amazon and get noticed in 1000's of resumes.",
    icon: resumeReviewIcon,
    class: 'howIcon',
    link: 'https://sites.google.com/interviewhelp.io/sdegameplan/resume'
  },
  {
    title: 'Mock Interviews',
    description: 'Schedule mock interviews with Technical program managers at Google,Facebook and Amazon and get critial make or break feedback.',
    icon: interviewIcon,
    class: 'howIcon-big',
    link: '/interview-tpm'

  }, {
    title: 'Placement Network',
    description: 'Accelerate your job search using our placement network.',
    icon: placementIcon,
    class: 'howIcon-big',
    link: 'https://sites.google.com/interviewhelp.io/sdegameplan/placements'
  }

];

const sdm = [
  {

    title: 'Calibration',
    description: 'Please answer some behavioral questions and schedule a 30-minute meeting to help us evaluate you and build a custom success plan designed for you.',
    icon: calibIcon,
    class: 'howIcon',
    link: 'https://rahulsalota716493.typeform.com/to/LI2CUR'
  },
  {
    title: 'Behavioral Coaching',
    description: 'Share your life experience stories and then get feedback to showcase the best about yourself.',
    icon: coachingIcon,
    class: 'howIcon',
    link: '/behavioral-coaching'
  }, {
    title: 'SDM Core',
    description: 'Identify your gaps in scrum, conflict , communication, and people management. Learn from engineering managers at top tier organizations.',
    icon: managerIcon,
    class: 'howIcon',
    link: '/sdm-core'
  }, {
    title: 'Leet Code Prep',
    description: 'Become a leet code expert in 2 weeks, using our unique pattern based approach and regular practice sessions.',
    icon: codeIcon,
    class: 'howIcon',
    link: 'Faq'
  },
  {
    title: 'System Design Prep',
    description: 'Learn system design in just 6 one hour sessions and nail your next interview.',
    icon: sysIcon,
    class: 'howIcon',
    link: '/system-design'
  },
  {
    title: 'Resume Review',
    description: "Get a professional resume review from engineering mangers at top tier companies like Facebook, Google and Amazon and get noticed in 1000's of resumes.",
    icon: resumeReviewIcon,
    class: 'howIcon',
    link: 'https://sites.google.com/interviewhelp.io/sdegameplan/resume'
  },
  {
    title: 'Mock Interviews',
    description: 'Schedule mock interviews with engineering managers at Google,Facebook and Amazon and get critial  make or break feedback.',
    icon: interviewIcon,
    class: 'howIcon-big',
    link: '/interview-sdm'
  }, {
    title: 'Placement Network',
    description: 'Accelerate your job search using our placement network.',
    icon: placementIcon,
    class: 'howIcon-big',
    link: 'https://sites.google.com/interviewhelp.io/sdegameplan/placements'
  }

];

const sde = [
  {

    title: 'Calibration',
    description: 'Please answer a few questions and schedule a 30-minute review session to understand your gaps, match against our in network jobs and chart out a succcess plan to FAANG.',
    icon: calibIcon,
    class: 'howIcon',
    link: 'https://interviewhelp.io/track/interview-once-software-engineer'
  },
  {
    title: 'Leet Code Prep',
    description: 'Choose your level from easy, medium, or hard. Learn our unique pattern based approach and practice with us online daily to ace your next coding interview.',
    icon: codeIcon,
    class: 'howIcon',
    link: 'Faq'
  },
  {
    title: 'System Design Prep',
    description: 'Learn system design in just 6 one hour sessions and nail your next interview.',
    icon: sysIcon,
    class: 'howIcon',
    link: '/system-design'
  },
  {
    title: 'Behavioral Coaching',
    description: 'Share your life experience stories and then get feedback to showcase the best about yourself.',
    icon: coachingIcon,
    class: 'howIcon',
    link: '/behavioral-coaching'
  },
  {
    title: 'Resume Review',
    description: "Get a professional resume review from engineering mangers at top tier companies like Facebook, Google and Amazon and get noticed in 1000's of resumes.",
    icon: resumeReviewIcon,
    class: 'howIcon',
    link: 'https://sites.google.com/interviewhelp.io/sdegameplan/resume'
  },
  {
    title: 'Mock Interviews',
    description: 'Schedule a mock interview with senior engineers at Google,Facebook and Amazon, to get critical feedback and polish your skill.',
    icon: interviewIcon,
    class: 'howIcon-big',
    link: '/interview-sde'
  },
  {
    title: 'Placement Network',
    description: 'Accelerate your job search using our strong placement network.',
    icon: placementIcon,
    class: 'howIcon-big',
    link: 'https://sites.google.com/interviewhelp.io/sdegameplan/placements'
  }

];

const tpmReviews = [
  {
    label: 'Meet Bharat Ram @ Facebook',
    title: 'Techincal Program Manager',
    aboutHim: 'Bharat is a seasoned TPM who has very impressive credentials. His prior positions included TPM at companies like Linkedin, Amazon, and Oracle. However, his previous experience with Facebook and Google did not yield positive results. The failure intrigued him, and he was determined to understand and grow into his dream company. Our training provided him a structure for answering various behavior and technical questions. We also taught him techniques to market himself in an interview setting. He worked very hard on the concepts he took from the numerous 1-on-1 sessions with his coaches. The offer from Facebook and a nice 30% increase in total comp as a result of 3-4 months of dedicated effort on his part and the guidance from the interview help team',
    videoPath: 'https://player.vimeo.com/video/368678931',
    titleImage: <FontAwesomeIcon icon={faLinkedin} size='2x' />,
    titleLink: 'https://www.linkedin.com/in/bharathrbashyam1/'
  },
  {
    label: 'Meet Adiseshu Shavi @ Amazon',
    title: 'Techincal Program Manager',
    aboutHim:
      'Adiseshu was working in Infosys and was looking to move to a FAANG company when he came across our service. He had made a couple of attempts at Amazon and had not been able to clear the interview. The frustrating part was that he did not get any feedback, so he hit a roadblock. Interviewhelp team worked with improving his system design skills, polishing his TPM skills, and working on his answer delivery. We helped him with choosing the right stories and gave him critical feedback on delivery. Now Adi is working at Amazon and is one of the top tier companies in the industry',
    videoPath: 'https://player.vimeo.com/video/368678435',
    titleImage: <FontAwesomeIcon icon={faLinkedin} size="2x" />,
    titleLink: 'https://www.linkedin.com/in/adisheshu-shavi-57980014/'
  },
  {
    label: 'Meet Praveen Director @ AntWorks',
    title: 'Director Techincal Program Manager',
    aboutHim:
      "After ten years of working at the same place, it is but natural that you lose touch with the latest and greatest in the interview world. The work of figuring out the various bars at various organizations, preparing, networking, and still keep everything in balance is not easy. The colossal effort required to change jobs makes many people stick to their current positions.  Praveen was in this same situation a few months ago. After getting frustrated going through countless youtube videos, he finally took Interviewhelp's help and was able to land a job as a Director of Technical Program Management at AntWorks",
    titleImage: <FontAwesomeIcon icon={faLinkedin} size='2x' />,
    titleLink: 'https://www.linkedin.com/in/praveenbr/',
    videoPath: 'https://player.vimeo.com/video/382377963'
  }

];

const sdmReviews = [
  {
    label: 'Meet Ahmed @ Google',
    title: 'Software Development Manager',
    aboutHim: "I just accepted an offer from Google! InterviewHelp was a big factor in helping me get there. The traditional advice is to interview with multiple companies at once, and while this is helpful when it comes to offer negotiation, you usually don't get detailed feedback beyond a binary yes/no. With InterviewHelp, you actually have a mock interview session with experienced professionals (often in FAANGs) who will be doing the actual interviewing. At the end of the mock interview, your interviewer goes through your interview performance in detail to help you improve. For me personally, my interviewers gave me confidence in my preparation highlighting my interview strengths. They then proceeded to give me feedback on where I can improve and giving me some suggestions there along the way. I highly recommend signing up for this! -A",
    videoPath: '/Ahmed.png',
    titleImage: <FontAwesomeIcon icon={faLinkedin} size="2x" />,
    titleLink: 'https://www.linkedin.com/in/Anonymous/'

  },

  {
    label: 'Meet George Andraws @ Redfin',
    title: 'Sr. Software Development Manager',
    aboutHim: "George Andrwas is a seasoned Dev manager(SAP Concur), QA Manager (Apple), and TPM (Amazon) and has 19+ years of industry experience. He was working at SAP Concur as a Sr. SDM and was looking to change. He quickly realized that he was solid at people and project management but not so in Distributed System Design. His various roles did not give him as much opportunity to flex his Distributed System Design skills. Interviewhelp.io's team helped him structure his approach to system design interviews. After a few sessions, George quickly picked up the skill and was able to get two offers",
    videoPath: 'https://player.vimeo.com/video/378664920',
    titleImage: <FontAwesomeIcon icon={faLinkedin} size="2x" />,
    titleLink: 'https://www.linkedin.com/in/georgeandraws/'

  }


];

const sdeReviews = [
  {
    label: 'Meet Harsh Vir @Axon',
    title: 'Sr. SDE',
    aboutHim: "Harhvir was laid off after working for the same organization for ten years. He was clueless about the new LEET code interview movement that everyone has so fondly adopted. Fortunately, a friend referred him to interviewhelp, and he started with our unique daily leetcode program. Within one month, he was able to master the essential leetcode pattern and now has a great fulltime job at AXON",
    videoPath: 'https://player.vimeo.com/video/372079077',
    titleImage: <FontAwesomeIcon icon={faLinkedin} size="2x" />,
    titleLink: 'https://www.linkedin.com/in/georgeandraws/'
  },
  {
    label: 'Meet Mayuresh Raul @ Oracle',
    title: 'SDE-2',
    aboutHim: 'Mayuresh was in a very precarious state. The startup he was working in was folding, and all the top-level executives were jumping ships. When he joined our program, he was very nervous and not sure if things will pan out for him. He was on an F1 visa and desperately needed H1B sponsorship. My team helped him get very very regular with leetcode, conducted multiple mock interviews to find the gaps, and coached him on quickly filling them up. When he was ready interviewhelp team presented him to a potential top tier (tier-1 and tier-2 ) employers. Mayuresh was able to crack the oracle interview in his first attempt. He was so happy with the Oracle team and offer that he declined other interviews we had lined up for him',
    videoPath: 'https://player.vimeo.com/video/380126934',
    titleImage: <FontAwesomeIcon icon={faLinkedin} size="2x" />,
    titleLink: 'https://www.linkedin.com/in/mayureshraul/'
  },
  {
    label: 'Meet TemiTayo @Microsoft',
    title: 'SDE-1',
    aboutHim: "TemiTayo's main issue was that she was not able to think and interact at the same time. She was looking for a realtime environment where she can get practice. Interviewhelp's unique process provided her that interactive environment, and she was able to clear Microsofts technical bar",
    videoPath: 'https://player.vimeo.com/video/369372735',
    titleImage: <FontAwesomeIcon icon={faLinkedin} size="2x" />,
    titleLink: 'https://www.linkedin.com/in/temitayo-fagbami-9b29345a/'
  },
  {
    label: 'Meet Azi Crawford',
    title: 'Sr. SDE',
    aboutHim: "Azi was having a hard time clearing phone screens. Azi has 8+ years of experience as a software developer with companies like Zillow and Ad Colony. He had applied to a lot of companies, but things were not moving past the phone screens. He contacted interviewhelp.io in late November. As we wanted quick results, I advised Azi to join both my leetcode easy and leetcode medium programs and also gave him some homework problems. The first few sessions made it clear to us that scala was getting in his way to execute, so he moved to Java. With a 2-3 hours regular and guided practice, he was able to land a full-time job offer in < 17 working days",
    videoPath: 'https://player.vimeo.com/video/382682201',
    titleImage: <FontAwesomeIcon icon={faLinkedin} size="2x" />,
    titleLink: 'https://www.linkedin.com/in/azicrawford'
  }

];

const typeArr = [
  {
    trackTitle: 'SDE',
    trackSection: sde,
    reviews: sdeReviews,
    // title: "How it Works",
    description: "Professional mentoring for Software Development Engineers (SDE). Depending on your experience, choose where you would like to start. If you are unsure or would like a personalized plan, click on calibration.",
    linkText: "Click on a card or icon to learn more."
  },
  {
    trackTitle: 'SDM',
    trackSection: sdm,
    reviews: sdmReviews,
    // title: "How it Works",
    description: "Professional mentoring for Software Development Managers (SDM). Depending on your experience, choose where you would like to start. If you are unsure or would like a personalized plan, click on calibration.",
    linkText: "Click on a card or icon to learn more."
  },
  {
    trackTitle: 'TPM',
    trackSection: tpm,
    reviews: tpmReviews,
    // title: "How it Works",
    description: "Professional mentoring for Technical Program Managers (TPM). Depending on your experience, choose where you would like to start. If you are unsure or would like a personalized plan, click on calibration.",
    linkText: "Click on a card or icon to learn more."
  }
];

let styles = (theme) => {
  return {
    root1: {
      background: '#F1F3FC',
      padding: '3rem',
      margin: 0,
      '& .Mui-selected': {
        background: '#ffffff !important',
        color: 'white !important'
      },
      [theme.breakpoints.down('sm')]: {
        padding: '40px 16px'
      },
      '& .vertical-timeline-element-date': {
        display: 'none !important'
      }
    },
    heading: {
      fontSize: '2rem',
      [theme.breakpoints.down('sm')]: {
        fontSize: '1.7rem',
    }
    },
    title: {
      color: '#fff'
    },
    body: {
      paddingTop: 8,
      fontStyle: 'italic',
      color: '#fff'
    },
    nextIcon: {
      fontSize: 20,
      right: '0%',
      top: '57%',
      color: '#fff',
      position: 'absolute',
      '&:hover': {
        background: 'transparent'
      },
      [theme.breakpoints.down('sm')]: {
        top: '36%',
      },
    },
    rootContainer: {
      marginTop: '3rem',
      position: 'relative'
    },
    reviewsSection: {
      position: "relative"
    },
    arrow: {
      textAlign: 'right',
      height: '1.25rem',
      '& img': {
        height: '100%',
        color: theme.palette.primary.main
      }
    }
  }
}

let currMaxStep = typeArr[0].reviews.length;


function Carousel({ classes }) {

  let [activeStep, setActiveStep] = React.useState(0);
  let title = typeArr[0].trackTitle;
  let maxSteps = typeArr[0].reviews.length; //eslint-disable-line
  
  
  const [value, setValue] = React.useState(0);
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
    document.querySelectorAll('.tabs-all').forEach(function (d) { d.style.display = 'none'; });
    title = typeArr[newValue].trackTitle;
    document.querySelector('span[type="' + title + '"]').style.display = "block";
    activeStep = 0;
    maxSteps = currMaxStep = typeArr[newValue].reviews.length;
    setActiveStep(0);
  };

  return (
    <React.Fragment>
      <Grid className={classes.root1}>
        <Typography variant="h4" align="center" className={classes.heading}>
            {'How it works'}
        </Typography>
        <Container className={classes.rootContainer}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
          >
            {typeArr.map((value, index) => (
              <Tab key={index} label={value.trackTitle} />
            ))}
          </Tabs>
          {typeArr.map((ob, i) => (
            <TabPanel key={i} value={value} index={i}>
              {/* <h2 className="track-title">{ob.title}</h2> */}
              <h4 className="track-description">{ob.description} <span>{ob.linkText}</span></h4>
              <VerticalTimeline>
                {ob.trackSection.map((val, index) => (
                  <VerticalTimelineElement
                    key={index}
                    className="vertical-timeline-element--work"
                    contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                    iconStyle={{ background: 'white', color: '#fff' }}
                    icon={<a target="_blank" rel="noopener noreferrer" href={val.link} ><img alt='' src={val.icon} className={val.class} ></img></a>}
                  >
                    <a target="_blank" rel="noopener noreferrer" href={val.link} ><h3 className="vertical-timeline-element-title">{val.title}</h3>
                      <p>
                        {val.description} <br/>
                      </p>
                      <div className={classes.arrow}>
                        <img alt='' src={RightArrowIcon} />
                      </div>
                    </a>
                  </VerticalTimelineElement>


                )
                )}
              </VerticalTimeline>
            </TabPanel>
          ))}
        </Container>
      </Grid>
      <VideoReviews
        typeArr={typeArr}
        currMaxStep={currMaxStep}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />
    </React.Fragment>
  );
}

export default withStyles(styles)(Carousel);
