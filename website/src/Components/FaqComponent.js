import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Container, Typography } from '@material-ui/core';
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


let gridClasses = ['interview-grid'];


function Faq({ classes, faq }) {

  const [value] = React.useState(0);

  return (
    <React.Fragment>
      <Grid className={gridClasses}>
        <Container className={classes.rootContainer}>
          <TabPanel value={value} index={0}>
            <h2 className="faq-title">FAQs</h2>

            {faq.map((val, index) => (
              <div>
                <h3 className="faq-question">{val.question}</h3>
                <p className="faq-answer" dangerouslySetInnerHTML={{
                  __html:
                    val.answer
                }} ></p>
              </div>

            ))}
          </TabPanel>
        </Container>
      </Grid>

    </React.Fragment>
  );
}

export default withStyles(styles)(Faq);
