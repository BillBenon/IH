import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { Button, Grid, Typography } from '@material-ui/core';
import bannerImage from "../assets/Banner/bannerBackground.svg";
import { CardContent, CardActionArea, CardMedia, Card } from '@material-ui/core';
import testImg from '../assets/featurePanel/coding.png'
import { LinkedIn, Pinterest, YouTube } from '@material-ui/icons';
import { IconButton, CardActions } from '@material-ui/core';
import LetsConnectModal from '../Components/TrackDetails/LetsConnectModal';
import { useLocation } from 'react-router-dom';


const aboutUsPageData = {
    title: 'About Us',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent posuere accumsan sem, 
    porttitor congue lacus dictum ut. Vivamus sodales nibh ac massa facilisis ullamcorper. Nunc sed magna 
    vulputate, convallis nunc non, iaculis justo. Vestibulum feugiat hendrerit tortor vel venenatis.
    Nam placerat lacus id magna vestibulum luctus. Vestibulum nec vulputate orci. In hac habitasse platea 
    dictumst. In luctus odio in sapien placerat ornare. Praesent volutpat lobortis consectetur. Suspendisse 
    convallis et dolor eget blandit. Nulla eget ipsum sodales nibh vehicula bibendum eu non lectus. 
    Nulla dapibus`,
    team: [
        {
            Name: 'Rahul Salota',
            Designation: 'Founder',
            image: testImg,
            Bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis nulla euismod, 
            gravida quam eget, pellentesque lorem. Nullam imperdiet pharetra imperdiet. Duis non bibendum ante,
            eleifend aliquet felis. Nam varius libero enim, sit amet scelerisque ligula pharetra id. 
            Nullam ut eros eu tellus elementum vehicula at sit amet dui. Fusce suscipit mi quis augue mattis, 
            et lacinia enim euismod. Etiam justo sem, posuere a libero vel, finibus ultrices ipsum.`,
            Links: {
                linkedIn: 'https://linkedin.com/in/',
                pinterest: 'https://in.pinterest.com/',
                youtube: 'http://youtube.com/'
            }
        },
        {
            Name: 'Sanjay Gupta',
            Designation: '',
            image: testImg,
            Bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent posuere accumsan sem, 
            porttitor congue lacus dictum ut. Vivamus sodales nibh ac massa facilisis ullamcorper. Nunc sed magna 
            vulputate, convallis nunc non, iaculis justo. Vestibulum feugiat hendrerit tortor vel venenatis.
            Nam placerat`,
            Links: {
                linkedIn: 'https://linkedin.com/in/',
                pinterest: 'https://in.pinterest.com/',
                youtube: 'http://youtube.com/'
            }
        },
        {
            Name: 'Priya',
            Designation: '',
            image: testImg,
            Bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent posuere accumsan sem, 
            porttitor congue lacus dictum ut. Vivamus sodales nibh ac massa facilisis ullamcorper. Nunc sed magna 
            vulputate, convallis nunc non, iaculis justo. Vestibulum feugiat hendrerit tortor vel venenatis.
            Nam placerat`,
            Links: {
                linkedIn: 'https://linkedin.com/in/',
                pinterest: 'https://in.pinterest.com/',
                youtube: 'http://youtube.com/'
            }
        },
    ],
    boardMembers:[
        {
            Name: 'Rahul Salota',
            Designation: 'Founder',
            image: testImg,
            Bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis nulla euismod, 
            gravida quam eget, pellentesque lorem. Nullam imperdiet pharetra imperdiet. Duis non bibendum ante,
            eleifend aliquet felis. Nam varius libero enim, sit amet scelerisque ligula pharetra id. 
            Nullam ut eros eu tellus elementum vehicula at sit amet dui. Fusce suscipit mi quis augue mattis, 
            et lacinia enim euismod. Etiam justo sem, posuere a libero vel, finibus ultrices ipsum.`,
            Links: {
                linkedIn: 'https://linkedin.com/in/',
                pinterest: 'https://in.pinterest.com/',
                youtube: 'http://youtube.com/'
            }
        },
        {
            Name: 'Sanjay Gupta',
            Designation: '',
            image: testImg,
            Bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent posuere accumsan sem, 
            porttitor congue lacus dictum ut. Vivamus sodales nibh ac massa facilisis ullamcorper. Nunc sed magna 
            vulputate, convallis nunc non, iaculis justo. Vestibulum feugiat hendrerit tortor vel venenatis.
            Nam placerat`,
            Links: {
                linkedIn: 'https://linkedin.com/in/',
                pinterest: 'https://in.pinterest.com/',
                youtube: 'http://youtube.com/'
            }
        },
        {
            Name: 'Priya',
            Designation: '',
            image: testImg,
            Bio: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent posuere accumsan sem, 
            porttitor congue lacus dictum ut. Vivamus sodales nibh ac massa facilisis ullamcorper. Nunc sed magna 
            vulputate, convallis nunc non, iaculis justo. Vestibulum feugiat hendrerit tortor vel venenatis.
            Nam placerat`,
            Links: {
                linkedIn: 'https://linkedin.com/in/',
                pinterest: 'https://in.pinterest.com/',
                youtube: 'http://youtube.com/'
            }
        },
    ],
}

const useStyles = makeStyles((theme) => ({
    root: {
        display:'flex',
        flexGrow: 1,
        marginTop: "92px",
        boxSizing: "border-box",
        "& .MuiTypography-root": {
            letterSpacing: "1px",
        },
    },
    banner: {
        '& .responsiveItemLeft': {
            '& img': {
                padding: '20px',
                height: '100%',
                maxWidth: '100%',
                maxHeight: '100%',
            },
            [theme.breakpoints.down('sm')]: {
                margin: '0 !important',
                width: '100%',
                textAlign: 'left !important',
                '& img': {
                    height: '14rem'
                },
            }
        },
        '& .responsiveItemRight': {
            '& p': {
                padding: '10px'
            },
            [theme.breakpoints.down('sm')]: {
                margin: '0 !important',
            }
        }
    },
    teamMembers: {
        maxWidth: 345,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    teamGrid: {
        justifyContent: 'space-around !important',
        marginBottom: '20px'
    },
    title: {
        marginBottom: '15px',
        height: 'min-content',
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        '& h1': {
            fontWeight: 'bold',
            borderBottom: '2px solid black',
            width: 'fit-content'
        }
    },
    icon: {
        width: '2rem !important'
    },
    motivational: {
        padding: '10px',
        textAlign: 'center',
        display: 'inline-flex',
        margin: '20px',
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        "& .successBtn": {
            backgroundColor: '#E25252',
            borderRadius: '4px',
            boxShadow: 'none',
            height: '48px',
            marginTop: '18px',
            fontWeight: '600',
            fontSize: '18px',
            letterSpacing: '1px',
            textTransform: "uppercase",
            '&:hover': {
                background: '#D73C3C'
            },
            '&:active': {
                background: '#D33030',
                boxShadow: 'none'
            }
        }
    }
}));

export default () => {
    const classes = useStyles();
    const [modalOpen, stModalOpen] = useState(false)
    const { search } = useLocation();
    const [modalProperties] = useState({
        heading: '',
        btnText: '',
    })

    const enrollFreePlan = () => window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lpflowtype=enroll`

    const getSocialIcon = (link) => {
        let socialIcon = '';

        switch (link) {
            case 'linkedIn':
                socialIcon = <LinkedIn className={classes.icon} />
                break;
            case 'pinterest':
                socialIcon = <Pinterest className={classes.icon}/>
                break;
            case 'youtube':
                socialIcon = <YouTube className={classes.icon}/>
                break;

            default:
                break;
        }
        return <IconButton
            size='small'
            color="inherit"
        >
            {socialIcon}
        </IconButton>
    }

    const getCards = (title, detailedArray = []) => {
        return <Grid container className={classes.teamGrid}>
        <div className={classes.title}>
            <h1>{title}</h1>
        </div>
        {detailedArray.map(member => {
            return <Card className={classes.teamMembers}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt={member.Name}
                        height="140"
                        image={member.image}
                        title={member.Name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {member.Name},{member.Designation}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {member.Bio}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    {Object.keys(member.Links).map(link => {
                        return getSocialIcon(link)
                    })}
                </CardActions>
            </Card>
        })}
    </Grid>
    }   
    return (
        <div className={classes.root}>
            <Grid container>
                <div className={classes.title}>
                    <h1>{aboutUsPageData.title}</h1>
                </div>
                <Grid container className={classes.banner}>
                    <Grid item xs={12} sm={6} className="responsiveItemLeft">
                        <img src={bannerImage} alt='na' />
                    </Grid>
                    <Grid item xs={12} sm={6} className="responsiveItemRight">
                        <p>{aboutUsPageData.description}</p>
                    </Grid>
                </Grid>
                {getCards('Team', aboutUsPageData.team)}
                {getCards('Board Members', aboutUsPageData.boardMembers)}
                <div className={classes.motivational}>
                    <div>
                        <Button
                            component="button"
                            variant="contained"
                            disableRipple
                            onClick={() => stModalOpen(true)}
                            className={'successBtn'}
                        >
                            {'Connect with us for your SUCCESS!'}
                        </Button>
                    </div>
                </div>
            </Grid>
            <LetsConnectModal
                {...modalProperties}
                defaultComment={`I am looking to connect with you for more custom options.`}
                open={modalOpen}
                handleClose={()=> stModalOpen(false)}
                enrollFreePlan={enrollFreePlan}
                customMsg={{
                    thankyouMsg:"Thank you for showing interest in InterviewHelp. We will get back to you as soon as possible.",
                    freePlanMsg:"We are happy to let you know that we have Freebies. Until we customize option for you why don't you try freebies."
                }}
            />
        </div>)
}