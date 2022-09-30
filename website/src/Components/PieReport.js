import React from 'react'
import Title from './Title';
import { withStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import fifthIcon from '../assets/PieChart/pie-report.PNG';
let styles =(theme)=>{
    return {
        root:{
            paddingTop: 0,
            display: "none",
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
            background: "#fff",
        },
        img:{
            marginTop: 30,
            width: "100%",
        },

        stitle:{
         fontsize: 21,
        }

    }
}

function PieReport({classes}) {
    return (
        <Container className={classes.root}>
            <Title   title="Currently, we are working with" className={classes.stitle}/>
            <img src={fifthIcon} className={classes.img} alt="" />
        </Container>
    )
}

export default withStyles(styles)(PieReport)
