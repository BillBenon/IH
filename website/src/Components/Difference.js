import React from 'react'
import { Grid, Typography, Container, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import Title from './Title';
import customIcon from '../assets/Difference/custom.svg'
import interview from '../assets/Difference/interview.svg'
import learn from '../assets/Difference/learn.svg'

const TILES = [
    {
        icon: customIcon,
        text: "Customized training plans ",
        subtext: "Every individual is unique; therefore, we need to listen, understand, and tailor our training programs to you."
    },
    {
        icon: interview,
        text: "Learn from the best ",
        subtext: "Our trainers are industry experts who have 15+ years of experience in top organizations like Amazon, Google, and Facebook. People with incredible credentials and passion for helping others."
    },
    {
        icon: learn,
        text: "Interview Intelligence",
        subtext: "With years of experience, we have a deep understanding of interview bar at top organizations."
    }
]

let styles = (theme) => {
    return {
        root: {
            padding: '3rem',
            background: '#F1F3FC',
            [theme.breakpoints.down('sm')]: {
                height: 'auto',
                padding: '40px 16px',
                '& .MuiGrid-root.MuiGrid-item': {
                    margin: '0 0 16px 0 !important',
                    padding: '0'
                },
                '& .MuiContainer-root': {
                    padding: '0'
                },
                '& .MuiGrid-spacing-xs-6': {
                    width: 'auto',
                    margin: '0'
                }
            },
        },
        paperRoot: {
            padding: '30% 15% 20%',
            textAlign: 'center',
            height: 400
        },
        img: {
            height: 75
        },
        text: {
            paddingTop: 20
        },
        subtext: {
            paddingTop: 10
        },
        heading: {
            padding: '0',
            marginBottom: '3rem'
        }
    }
}
const Tile = ({ classes, icon, text, subtext }) => (
    <Paper elevation={4} className={classes.paperRoot}>
        <img src={icon} alt="" className={classes.img} />
        <Typography variant="h5" className={classes.text}>
            {text}
        </Typography>
        <Typography variant="body1" className={classes.subtext}>
            {subtext}
        </Typography>
    </Paper>
)

function Difference({ classes }) {
    return (
        <Grid className={classes.root}>
            <Container>
                <Title color='#000' lineVisible='none' title="What makes us Different?" classes={{ title: classes.heading }} />
                <Grid container spacing={6} justify="center" className={classes.mainTile}>
                    {TILES.map((item, i) => (
                        <Grid key={i} item xs={12} sm={4}>
                            <Tile classes={classes} {...item} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Grid>
    )
}

export default withStyles(styles)(Difference)
