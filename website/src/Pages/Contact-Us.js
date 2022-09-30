import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from '@material-ui/core';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import PhoneIcon from '@material-ui/icons/Phone';
import MailIcon from '@material-ui/icons/Mail';
import SlackIcon from '../assets/Contactus Icons/slack.png'
import SkypeIcon from '../assets/Contactus Icons/skype.png'
import interviewHelpHQ from '../assets/Contactus Icons/headquarter.png'
import { useLocation } from 'react-router-dom';
import LetsConnect from '../Components/LetsConnect';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        marginTop: "92px",
        boxSizing: "border-box",
        "& .MuiTypography-root": {
            letterSpacing: "1px",
        },
        "& .MuiGrid-container":{
            justifyContent:'center',
        }
    },
    banner: {
        margin: '15px',
        '& .responsiveItemLeft': {
            paddingRight: '10px',
            [theme.breakpoints.down('sm')]: {
                margin: '0 !important',
                width: '100%',
                textAlign: 'left !important',
            }
        },
        '& .responsiveItemRight': {
            paddingLeft: '10px',
            '& img':{
                width: '100%',
            },
            '& p': {
                padding: '10px'
            },
            [theme.breakpoints.down('sm')]: {
                margin: '0 !important',
            }
        }
    },
    paper: {
        borderRadius: 0,
        boxShadow: 'none',
        padding: theme.spacing(3),
        "& .addressInfo": {
            paddingTop: 0,
        },
        "& span": {
            paddingTop: '15px',
            position: 'absolute',
            display: 'inline-block',
            "& h3": {
                marginBottom: '5px',
                marginTop: '5px',
            }
        },
        "& img": {
            width: '50px',
        }
    },
    splitGrid: {
        display: 'flex',
        "& >div": {
            width: '50%'
        }
    },
    topBorder:{
        borderTop: '1px solid black',
        display:'flex',
        [theme.breakpoints.down('sm')]: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '0 !important',
          },
    },
    letsconnect:{
        border: '1px solid black',
        [theme.breakpoints.up('sm')]:{
            width: '100% !important',
            margin: '15px',
            "& .name,.email,.phoneNum,.btnConWidUs":{
                maxWidth: '40% !important'
            },
            "& form":{
                "& .MuiGrid-root":{
                    display: 'flex',
                    flexDirection:'column',
                    justifyContent: 'left'
                },
                "& .phoneNum>div":{
                    flexDirection:'row'
                },
                
            }
        }
    }
}));

const contactUsData = {
    title: 'Contact Info',
    gMapAdd:'https://www.google.com/maps/place/8015+Douglas+Ave+SE,+Snoqualmie,+WA+98065,+USA/@47.528396,-121.8794867,17z/data=!3m1!4b1!4m5!3m4!1s0x54907ba8e8cf1025:0x8179588cef45060f!8m2!3d47.528396!4d-121.877298',
    Address: '8015 Douglas Ave SE, Snoqualmie, WA 98065, United States',
    Phone: '+1 425-298-3856',
    skype: '@interviewhelp',
    mail: 'contact@interviewhelp.io',
    slack: {
        text: 'Join Our Slack Channel',
        url: 'https://interviewhelpiogroup.slack.com/join/shared_invite/zt-dcrkvyuv-g8sY1HxexCvHU9Xbi~PUUw#/shared-invite/email'
    }
}

export default ({ focusForm, resetFocusForm, setEmail }) => {
    const classes = useStyles();
    const { search } = useLocation();
    const styleProps = {
        border: '1px solid black',
        margin: '10px'
    }
    const enrollFreePlan = () => window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lpflowtype=enroll`
    return (<div className={classes.root}>
        <Grid container>
            <Grid container className={classes.banner}>
                <Grid item xs={12} sm={6} className="responsiveItemLeft">
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><h1>{contactUsData.title}:</h1></Paper>
                    </Grid>
                    <Grid item xs={12} className={classes.topBorder}>
                        <Paper className={classes.paper}>
                            <PersonPinCircleIcon />
                            <span className='addressInfo'>
                                <div><h3>Address</h3></div>
                                <div>
                                    <a
                                        target='_blank'
                                        rel="noopener noreferrer"
                                        href={contactUsData.gMapAdd}>
                                        {contactUsData.Address}
                                    </a>
                                </div>
                            </span>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} className={[classes.splitGrid, classes.topBorder]}>
                        <Paper xs={12} className={classes.paper}>
                            <PhoneIcon />
                            <span>
                                <a href={`tel:${contactUsData.Phone}`}>{contactUsData.Phone}</a>
                            </span>
                        </Paper>
                        <Paper xs={12} className={classes.paper}>
                            <img src={SkypeIcon} alt='' />
                            <span><a href={`skype:${contactUsData.skype}?chat`}>{contactUsData.skype}</a></span></Paper>
                    </Grid>
                    <Grid item xs={12} className={[classes.splitGrid, classes.topBorder]}>
                        <Paper className={classes.paper}>
                            <MailIcon />
                            <span><a href={`mailto:${contactUsData.mail}`}>{contactUsData.mail}</a> </span>
                        </Paper>
                        <Paper className={classes.paper}>
                            <img src={SlackIcon} alt='' />
                            <span>
                                <a
                                    target='_blank'
                                    rel="noopener noreferrer"
                                    href={contactUsData.slack.url}>
                                    {contactUsData.slack.text}
                                </a>
                            </span>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} className="responsiveItemRight">
                    <a
                        target='_blank'
                        rel="noopener noreferrer"
                        href={contactUsData.gMapAdd}>
                        <img src={interviewHelpHQ} alt='na' />
                    </a>
                </Grid>
            </Grid>
            <LetsConnect
                className={classes.letsconnect}
                styleProps={styleProps}
                enrollFreePlan={enrollFreePlan}
                defaultComment={`I am looking to connect with you for more custom options.`}
                customMsg={{
                    thankyouMsg: "Thank you for showing interest in InterviewHelp. We will get back to you as soon as possible.",
                    freePlanMsg: "We are happy to let you know that we have Freebies. Until we customize option for you why don't you try freebies."
                }}
            />
        </Grid>
    </div>)
}