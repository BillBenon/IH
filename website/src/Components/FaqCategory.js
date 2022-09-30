import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import 'react-vertical-timeline-component/style.min.css';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      className="faq-content"

    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

const easy = [
  {
    question: 'Q. Is this for me?',
    answer: "A. If you have a good grasp on basic data structures - hash map, trees, graphs, stacks and queues and are familiar with basic algorithms sorting and searching, then you are good to join this program. The objective of the program is to get you familiar with patterns. Patterns are basic building blocks that will allow you to solve more complicated problems in the medium and hard legs of the program. If you are not familiar with data structures and algorithms, then please check out our Algorithms course",
  }, {

    question: 'Q. How long is the program?',
    answer: "A. It depends from individual to individual. Typically it takes 1-2 months to complete the course, but depending on your assimilation rate, it could be longer. The key indicator is that given any easy question, are you able to identify the pattern and code it in less than 15 minutes? You will always have some blind spots, but if you are able to do this for 80% of the problems then I think you are ready for the next stage of the program.",
  }, {

    question: 'Q. Can I take your advanced and easy classes together?',
    answer: "A. We have seen excellent results if you work on both medium and easy programs simultaneously, so if you have the time, I highly advice you to do so.",
  }, {

    question: 'Q. Who will be taking the class?',
    answer: "A. We have qualified and trained instructors who will be leading the classes; typically, they are PHD students from top-tier colleges or candidates already working at top-tier companies.",
  }, {

    question: 'Q. Do you have a package?',
    answer: "A. Yes, we have customized packages.  We tailor them to your needs. Please schedule sometime with us to have further discussion.",
  }, {

    question: 'Q. When does the class start?',
    answer: "A. You can join the class when ever you want. Every class is a new topic, a new pattern and therefore we are able to accept students in the middle of the class.",
  },
  {
    question: 'Q. What will be the strength of the class?',
    answer: "A. We typically try to keep it <= 5, however, we will occasionally have some people who audit the class.",
  },
  {
    question: 'Q. What is the format of the class?',
    answer: "A. Each class starts with the description of a topic/pattern. Once every one is clear with the pattern then we present a question to the class. Everyone tries to give some solution, the instructors role is to provide useful hints to drive the group to the most optimal solution. Each candidate then has to implement this code in a coder pad. The instructor takes notes and documents the gaps.",
  },
  {
    question: 'Q. What do I do if I have a hard time building logic?',
    answer: "A. If building logic is not easy for you then in addition to the class, we will suggest that you also partake on a 1-on-1 session with our experts. The most common requests we get are \"I need help with recursion or dynamic programming.\""
  }


];

const med = [
  {
    question: 'Q. Is it for me?',
    answer: "A. If you have already solved around 75-100 easy questions or if you have joined our leet code easy course, then you should be good for this course as well. I have seen this to be the bar at most software tech companies except for FAANG group or companies alike.",
  }, {

    question: 'Q. How long is this course?',
    answer: "A. Typically, it takes 1-2 months to complete this course.",
  },
  {
    question: 'Q. What is the format?',
    answer: "A. Each class start with a question, we don't have any patterns training here as it is mostly being able to use them. Typically these questions have more than 1 pattern involved.",
  },
  {
    question: 'Q. Who teaches this course?',
    answer: "A. The instructors are people who are either PDH's from top tier college or people who are working or have worked at tier-1 or tier-2 companies.",
  },
  {
    question: 'Q. When can I join?',
    answer: "A. You should be able to join when you are ready.",
  },
  {
    question: 'Q. Do I need to do easy before I join medium?',
    answer: "A. No, I have seen excellent results when people do both at the same time. It all depends on how much time do you have and how soon do you want to see results.",
  }

];

// const hard = [
//   {
//     question: 'Q. Is it for me?',
//     answer: "A. If you have reached this level, then congratulations. You are an expert with a good foundation, but now it is critical to increase your problem-solving skills to reach the mastery of a ninja. Our objective now is to help you to quickly identify the base patterns and expand its horizon using your own strategic thinking. Don’t worry, we will be by your side to refine any areas of improvement.",
//   },
//   {
//     question: 'Q. How long is this course?',
//     answer: "A. At this point, you should be practicing on a daily basis. It should be like playing a game of chess or league of legends. It should be a habit—don’t lose motivation. We will also be your cheerleaders.",
//   },
//   {
//     question: 'Q. What is the format?',
//     answer: "A. We put a question in front of everyone that develops into a discussion and we try to solve the problem together. Then everyone codes on their personal coderpad.",
//   },
//   {
//     question: 'Q. Who teaches this course?',
//     answer: "A. The course is taught by someone who is already working or has worked at top-tier organizations such as Amazon, Google, and Facebook.",
//   },
//   {
//     question: 'Q. When can I join?',
//     answer: "A. You can join anytime.",
//   },
//   {
//     question: 'Q. Do I need to do easy before I join medium?',
//     answer: "A. No, just jump in and if you really struggle then you can start with easy.",
//   }
// ];

const onsuccess = [
  {
    question: 'Q. Is it for me?',
    answer: "A.The on success package is desgined for your success in a short period of time. My suggestion is that if you are really commited and have some time on your hand then it is the best option.",
  },
  {
    question: 'Q. When can I join?',
    answer: "A. You can join anytime. Just choose your level and decided on which Two classes you will like to join and start practicing.",
  },
  {
    question: 'Q. What are next steps?',
    answer: "A. Please set up a 30 minutes meeeting on my calendar. We will first assess your eligibility, following that we will send you a contract through docusign , send you an invoice through stripe and finally add you to all the meeting requests",
  },
  {
    question: 'Q. What is a typical time frame to see success ?',
    answer: "A. Typically 1-3 months",
  },
  {
    question: 'Q. Why is there a range from 5-10% ?',
    answer: "A. Everyone is different, some candidates need more help where as others need less,therefore we keep a range. For example in somecases we have to give 1-on-1 training in order to bring the candidate upto speed and in other cases we have to use our influence to line up things",
  }
];

const questionType = [
  {
    title: 'OSP',
    price: "500 per month + 5-10% of base on Success",
    info: ["On Success payment plan", "Join any one session series", "Four 1-on-1 system design sessions", "Two 1-on-1 Behavior sessions", "Resume Review", "Placement Support"],
    questions: onsuccess
  },
  {
    title: 'Easy',
    price: "800 per month or $70 per day",
    info: ["Sun-Tue-Thu 7:30AM - 9:30AM PST", "Learn 70+ base coding patterns", "Code questions in class and get realtime feedback",
      "1-on-1 support", "Small class size of 1-7", "Video recording for each session", "Expected time frame 1-2 months"],
    questions: easy
  },
  {
    title: 'Med/Hard',
    price: "1000 per month or $110 per day",
    info: ["Daily 7:30PM - 8:30PM PST", "MWF 5:30 PM - 7:30 PM", "MWF 6:30 am - 8:30 am", "Learn to apply multiple coding patterns to solve the problem", "Learn to solve logically dense problems", "Code 50+ logically dense problems in class", "Small class size of 1-7", "Video recording for each session", "Expected time frame 1-2 months"],
    questions: med
  }

];

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
      padding: 30,
      margin: 10,
      paddingBottom: 0,
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

    rootContainer: {
      position: 'relative',
      maxWidth: '800px',
      '& .Mui-selected': {
        background: '#ffffff !important',
        color: 'white !important'
      },
    }
  }
}

let gridClasses = ['faq-grid'];


function FaqLayout({ classes }) {

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <Grid className={classes.root1}>
        <Container className={classes.rootContainer}>
          {questionType.map((value, index) => (
            <div className={"leet_box"}>
              <div className="leet_box_left">
                <div className="leet_left_text">
                  <h3>{value.title}</h3>
                  <p>$ {value.price}</p>
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
      <Grid className={gridClasses}>
        <Container className={classes.rootContainer}>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
          >
            {questionType.map((value, index) => (
              <Tab label={value.title} />
            ))}
          </Tabs>

          {questionType.map((v, i) => (
            <TabPanel value={value} index={i}>
              <h2 className="faq-title">FAQs</h2>

              {v.questions.map((val, index) => (
                <div>
                  <h3 className="faq-question">{val.question}</h3>
                  <p className="faq-answer">{val.answer}</p>
                </div>

              ))}
            </TabPanel>
          ))}
        </Container>
      </Grid>

    </React.Fragment>
  );
}

export default withStyles(styles)(FaqLayout);
