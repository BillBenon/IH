import React from 'react'
import image from '../assets/toporg/toporg.svg'
import Title from './Title';
import { withStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';

let styles =(theme)=>{
    return {
        root:{
            background: '#F1F3FC',
            paddingTop: 200,
            textAlign: 'center',
            [theme.breakpoints.down('sm')]: {
                display: 'none',
            },
        },
        img:{
            marginTop: 30,
            width: 1000,
        }

    }
}

function TopOrganization({classes}) {
    return (
        <Container className={classes.root}>
            {/* <Title lineVisible="none"  title="Currently, our network includes"/> */}
            {/* <img src={image} className={classes.img} alt="" /> */}
        </Container>
    )
}

export default withStyles(styles)(TopOrganization)
