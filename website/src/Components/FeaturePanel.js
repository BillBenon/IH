import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { Fragment, useState } from 'react';
import ReactGa from 'react-ga';
import CodingPng from '../assets/featurePanel/coding.png';
import FaangPng from '../assets/featurePanel/faangqbank.png';
import SlackPng from '../assets/featurePanel/slack.jpg';
import SysdesignPng from '../assets/featurePanel/sysdesign.png';
import axiosInstance from '../utils/axiosInstance';
import EmailModal from './EmailModal';

const TILETAGS = {
    faang: 'FAANGDownload',
    sysDesign: 'RegisterSystemDesignSession',
    coding: 'RegisterCodingSession'
}

const features = [
    {
        image: `${SlackPng}`,
        title: 'Join us on Slack',
        desc: 'Join our slack group and get tips, tricks, FAANG interview questions, referrals and many more',
        btnType: 'link',
        href: 'https://join.slack.com/t/interviewhelpiogroup/shared_invite/zt-dcrkvyuv-g8sY1HxexCvHU9Xbi~PUUw',
        btnText: 'Join slack'
    },
    {
        image: `${FaangPng}`,
        title: 'FAANG Question Bank',
        desc: 'Get our Ever growing Database of FAANG Interview questions',
        btnType: 'modal',
        btnText: 'Send Now',
        tag: TILETAGS.faang
    },
    {
        image: `${SysdesignPng}`,
        title: 'Free Trial of System Design Sessions',
        desc: '',
        btnType: 'modal',
        btnText: 'Register Now',
        tag: TILETAGS.sysDesign
    },
    {
        image: `${CodingPng}`,
        title: 'Free Trial of Coding Sessions',
        desc: '',
        btnType: 'modal',
        btnText: 'Register Now',
        tag: TILETAGS.coding
    },
]

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: '#F1F3FC',
        width: '100%',
        padding: '3rem',
        [theme.breakpoints.down('sm')]: {
            padding: '40px 16px'
        }
    },
    heading: {
        fontSize: '2rem',
        [theme.breakpoints.down('sm')]: {
            fontSize: '1.7rem',
        }
    },
    button: {
        background: theme.palette.primary.main,
        borderRadius: '4px',
        color: '#fff',
        padding: '10px 24px',
        fontSize: '1rem',
        textTransform: 'none',
        marginTop: '16px',
        '&:hover': {
            background: '#2144C7'
        },
        '&:active': {
            background: '#1939C0'
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '1rem'
        }
    },
    container: {
        marginTop: '3rem',
        '& .MuiPaper-root': {
            padding: '1rem',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            textAlign: 'left',
            cursor: 'pointer',
            '&:hover': {
                background: '#F8F8F8'
            }
        },
        '& .MuiTypography-root.MuiTypography-h5': {
            margin: '1.5rem 0 1rem 0',
            fontSize: '1.56rem',
            color: 'black !important'
        },
        '& .MuiGrid-item': {
            [theme.breakpoints.down('sm')]: {
                margin: '0 !important',
                width: '100%'
            }
        }
    },
}));

export default function FeaturePanel() {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [activeTileTag, setActiveTile] = useState('');
    const [modalProperties, setModalProperties] = useState({
        heading: '',
        btnText: '',
    });
    const [message, setMessage] = useState(null);

    const openModal = (clickedModalTag) => {
        switch (clickedModalTag) {
            case TILETAGS.faang:
                setModalProperties({
                    heading: 'Get the FAANG Question Bank',
                    btnText: 'Send'
                });
                setActiveTile(clickedModalTag);
                break;
            case TILETAGS.sysDesign:
            case TILETAGS.coding:
                setModalProperties({
                    heading: 'Get the joining instructions',
                    btnText: 'Register'
                });
                setActiveTile(clickedModalTag);
                break;
            default:
                return null
        }
        setOpen(true);
    }

    const closeModal = () => {
        setOpen(false);
    };

    const preparePayload = (email) => {
        let payload = {};
        payload.email = email;
        payload.tags = [activeTileTag];
        return payload;
    }

    const sendGaEvent = () => {
        let category = '';
        let label = '';
        switch (activeTileTag) {
            case TILETAGS.faang:
                category = 'question_bank';
                label = 'question_bank';
                break;
            case TILETAGS.sysDesign:
                category = 'system_design';
                label = 'system_design';
                break;
            case TILETAGS.coding:
                category = 'coding_trial';
                label = 'coding_trial';
                break;
            default:
                return null
        }
        ReactGa.event({
            category: category,
            label: label,
            action: `User pressed ${activeTileTag}`
        });
    }

    const handleSubmit = (email) => {
        sendGaEvent();

        const payload = preparePayload(email);
        axiosInstance.post("users", payload).then(response => {
            setStatusMessage('Email successfuly sent, kindly check.');
        }).catch(error => {
            setStatusMessage('Something went wrong, please try again.');
        });
    }

    const navigateToSlack = (href) => {
        ReactGa.event({
            category: 'Slack',
            label: 'Slack',
            action: 'User pressed Join slack button'
        });

        window.open(href, '_blank');
    }

    const setStatusMessage = (message) => {
        setMessage(message);
        setTimeout(() => setMessage(null), 5000);
    }

    return (
        <Fragment>
            <div className={classes.root}>
                <Typography variant="h4" align="center" className={classes.heading}>
                    {'Be a part of our Ever-growing Community'}
                </Typography>
                <Grid container spacing={2} className={classes.container}>
                    {features.map((tile, index) => (
                        <Grid key={index} item sm>
                            <Paper elevation={4} className={classes.paper} onClick={() => {
                                if (tile.btnType === "link")
                                    return navigateToSlack(tile.href);
                                else
                                    return openModal(tile.tag);
                            }}>
                                <div>
                                    <img alt='' src={tile.image} width="100%"></img>
                                    <Typography variant="h5">
                                        {tile.title}
                                    </Typography>
                                    <Typography variant="subtitle1">
                                        {tile.desc}
                                    </Typography>
                                </div>
                                <div>
                                    {tile.btnType === "link" &&
                                        <Button
                                            className={classes.button}
                                            component="a"
                                            disableRipple>
                                            {tile.btnText}
                                        </Button>}
                                    {tile.btnType === "modal" &&
                                        <Button type="button"
                                            className={classes.button}
                                            disableRipple>
                                            {tile.btnText}
                                        </Button>}
                                </div>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </div>
            <EmailModal
                {...modalProperties}
                open={open}
                handleClose={closeModal}
                handleOK={handleSubmit}
                message={message}
            />
        </Fragment>
    );
}