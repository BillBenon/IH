import React, {Fragment} from 'react'
import { withStyles } from '@material-ui/styles';
import {  Typography } from '@material-ui/core';

let styles =(theme)=>{
    return {
        title:{
            textAlign: 'center',
            fontSize: '2rem',
            [theme.breakpoints.down('sm')]: {
                fontSize: '1.7rem',
            },
            padding: '0px 0 20px'
        },
        lineRed:{
            width: '100% !important',
            height: '3px !important',
            margin: '0 auto',
            display: 'block',
            background: 'red'
        },
        lineYellow:{
            width: 100,
            height: 5,
            background: '#FFC056',
            display: 'block',
            margin: '0 auto'
        }
    }
}

function Title({classes, title, color,lineVisible ='block',lineTheme='lineRed'}) {
    let classLine = (lineTheme === 'lineRed')?classes.lineRed:classes.lineYellow;
    return (
        <Fragment>
           <Typography variant="h2" className={classes.title} style={{color: color}}>{title}</Typography>
            <span className={classLine} style={{display: lineVisible}}></span>
        </Fragment>
    )
}

export default withStyles(styles)(Title)
