import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Container, Typography} from '@material-ui/core';
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

let styles =(theme)=>{
    return {
        rootContainer:{
            position: 'relative',
            maxWidth: '800px'
        }
    }
}


let gridClasses = ['interview-grid'];


function faq({classes,data}) {

  return (
  <React.Fragment> 
    <Grid className={gridClasses}>
        <Container className={classes.rootContainer}>
        <TabPanel value={0} index={0}>
        
        {data.map((val, index) => (
          <div>
          <h2 className="faq-question">{val.question_title}</h2>
          <h3 className="faq-question" dangerouslySetInnerHTML={{__html:val.question}}></h3>
          <p className="faq-answer" dangerouslySetInnerHTML={{__html: 
        val.description}} ></p>
          <img src={val.imageURL} className="img-faang-interviews" alt=""/>
          </div>        
        
        ))}
      </TabPanel>
      </Container>
    </Grid>
    
    </React.Fragment>
  );
}

export default withStyles(styles)(faq);
