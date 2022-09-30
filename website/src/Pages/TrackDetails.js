import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    Box,
    Button,
    Chip,
    Divider,
    Grid,
    Link,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Paper,
    Tooltip
} from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useLocation } from 'react-router-dom';
import SwipeableViews from 'react-swipeable-views';
import CapabilityModal from '../Components/TrackDetails/CapabilityModal';
import { Categories } from '../Components/TrackDetails/Categories';
import LetsConnectModal from '../Components/TrackDetails/LetsConnectModal';
import { MarketingWrapper } from '../Components/TrackDetails/MarketingWrapper';
import { PlanCard } from '../Components/TrackDetails/PlanCard';
import { Process } from '../Components/TrackDetails/Process';
import Meta from '../partials/seo-meta';
import { post } from '../utils/axiosInstance';
import { colorsArray, planTypes, TemplateTypes } from '../utils/Constants';
import { removeTrackSpaces } from '../utils/helper';
import TracksUpdated from "./TracksUpdated";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "80px 40px",
        [theme.breakpoints.only('xs')]: {
            padding: "85px 0px",
            width: "95%",
            display: "flex",
            margin: "0 auto",
        },
    },
    mobileGridItem: {
        [theme.breakpoints.down('sm')]: {
            marginLeft: "0px !important",
            marginBottom: "0px !important"
        }
    },
    avatar: {
        backgroundColor: "transparent",
        width: '70px',
        "& img": {
            objectFit: "fill",
        }
    },
    subHeading: {
        padding: "5px 20px",
        fontWeight: "bold",
        backgroundColor: "#315CD5",
        color: "#FFF",
        fontSize: "18px",
    },
    planCheckList: {
        fontSize: "14px",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "#545454"
    },
    chip: {
        margin: '5px',
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    media: {
        padding: '1rem',
        height: '20rem',
        border: "0px",
        paddingTop: "0px",
    },
    sameLine: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        color: "#545454",
    },
    listItemIcon: {
        minWidth: "30px !important"
    },
    trackTitle: {
        fontWeight: "bold",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        textTransform: "uppercase",
        [theme.breakpoints.only('xs')]: {
            fontSize: "16px"
        }
    },
    centerAligned: {
        display: "flex",
        justifyContent: "center"
    },
    registerBtnRoot: {
        backgroundColor: '#E25252',
        borderRadius: '4px',
        marginLeft: "32px",
        boxShadow: 'none',
        '&:hover': {
            background: '#D73C3C'
        },
        '&:active': {
            background: '#D33030',
            boxShadow: 'none'
        },
        [theme.breakpoints.down('sm')]: {
            margin: '0'
        },
        fontWeight: "700",
        fontSize: "14px",
        fontFamily: "sans-serif",
        textTransform: "uppercase",
    },
    successStoriesHeading: {
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        margin: "0px",
        color: "#545454"
    },
    description: {
        paddingTop: "0px",
    },
    keyPoints: {
        color: "#FFF",
        padding: "5px 20px",
        fontSize: "18px",
        fontWeight: "bold",
        backgroundColor: "#315CD5",
        margin: "0",
        [theme.breakpoints.down('sm')]: {
            fontSize: "16px",
            padding: "5px",
        }
    },
    container: {
        '& .MuiGrid-item': {
            [theme.breakpoints.down('sm')]: {
                margin: '0 !important',
                padding: '0 !important',
            }
        },
        '& .MuiCardContent-root': {
            [theme.breakpoints.down('sm')]: {
                padding: "0px !important"
            }
        }
    },
    primary: {
        backgroundColor: "rgb(153, 194, 250)",
    },
    success: {
        backgroundColor: "rgb(155, 201, 156)",
    },
    secandary: {
        backgroundColor: "rgb(231, 212, 135)",
    },
    cardMargin: {
        [theme.breakpoints.down('sm')]: {
            margin: '15px !important',
        }
    },
    priceList: {
        [theme.breakpoints.down('sm')]: {
            paddingTop: "20px !important"
        }
    },
    mb0: {
        [theme.breakpoints.down('sm')]: {
            marginBottom: "0px !important"
        }
    },
    capabilityBox: {
        height: "20rem",
    },
    capabilityWrapper: {
        justifyContent: "center",
    },
    successStoryItem: {
        justifyContent: "center"
    }
}));

export const TrackDetails = () => {
    const { trackname } = useParams();
    const { search } = useLocation();
    const matches = useMediaQuery('(min-width:600px)');
    const classes = useStyles();
    const [trackdetail, settrackdetail] = useState({});
    const [activeStep, setActiveStep] = useState(0);
    const [open, setOpen] = useState(false);
    const [currentCategory, setCurrentCategory] = useState();
    const [message] = useState(null);
    const [modalProperties] = useState({
        heading: '',
        btnText: '',
    });
    let stepFlag = 1;

    const onShowMoreCapability = (category) => {
        setCurrentCategory(category);
    }

    function handlePreviousStory() {
        setActiveStep(
            (prevActiveStep) => {
                return prevActiveStep - 1
            });
    }

    function handleStoryChange(step) {
        if (stepFlag === 1 && step < trackdetail.successStories.length) {
            setActiveStep(step);
        }
    }

    function handleNextStory() {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    }

    const closeNextConnectModal = () => {
        setOpen(false);
    };

    const closeCategoryModal = () => {
        setCurrentCategory();
    }

    const renderProcess = () => {
        if (!trackdetail?.ourProcess || !trackdetail?.ourProcess.length) return
        return <Process processSteps={trackdetail?.ourProcess} />
    }

    const renderTrackInfo = () => {
        return (
            <Grid item className={classes.mobileGridItem} xs={12}>
                <Card >
                    <CardHeader
                        avatar={
                            matches && trackdetail.logo && <Avatar src={trackdetail.logo} aria-label="recipe" className={classes.avatar}>
                                {(trackdetail.title || "").charAt(0)}
                            </Avatar>}
                        title={<Typography variant="h5" className={classes.trackTitle}>{trackdetail.title && trackdetail.title}</Typography>}
                    />
                    <CardContent className={classes.description} >
                        {trackdetail.description && <Typography paragraph dangerouslySetInnerHTML={{ __html: trackdetail.description }}>
                        </Typography>}
                        {trackdetail.detailsDescription && <Typography paragraph dangerouslySetInnerHTML={{ __html: trackdetail.detailsDescription }}>
                        </Typography>}
                        {matches && <Box display="flex" justifyContent="center" style={{ width: "100%" }}>
                            {renderFreeButton()}
                        </Box>}
                    </CardContent>
                </Card >
            </Grid>
        );
    }

    const renderKeyPoints = () => {
        return (
            trackdetail.keyPoints && !!trackdetail.keyPoints.length && <Grid item xs={12} className={classes.mobileGridItem}>
                <Card className={classes.container}>
                    <CardHeader
                        title={<Grid container spacing={3}>
                            <Grid item justify="start" sm={9} xs={12}>
                                <Paper elevation={5} variant="outlined" square={true}><h1 className={classes.keyPoints}>{'How this will take you to the next level?'}</h1></Paper>
                            </Grid>
                        </Grid>}
                    />
                    <CardContent>
                        <List>
                            {trackdetail.keyPoints.map(d => <ListItem key={d}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <FontAwesomeIcon icon={faCheck} size='1x' color="#315CD5" />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography className={classes.planCheckList}>{d}</Typography>}>
                                </ListItemText>
                            </ListItem>)}
                        </List>
                    </CardContent>
                </Card >
            </Grid>
        );
    }

    const renderCategories = () => {
        return (
            trackdetail.categories && !!trackdetail.categories.length &&
            <Categories categories={trackdetail.categories} onShowMoreCapability={onShowMoreCapability} />
        );
    }

    const renderCapabilities = () => {
        if (!trackdetail?.categories || !trackdetail?.categories?.length) return;
        const capabilitiesOfCats = trackdetail.categories.map(cat => cat.capabilities);
        const caps = [].concat.apply([], capabilitiesOfCats);
        return (
            caps && !!caps.length && <Grid item className={classes.mobileGridItem} xs={12}>
                <Card className={classes.container}>
                    <CardHeader
                        title={<Grid container spacing={3}>
                            <Grid item justify="start" sm={9} xs={12}>
                                <Paper elevation={5} variant="outlined" square={true}><h2 className={classes.keyPoints}>{'Capabilities you will be evaluated for.'}</h2></Paper>
                            </Grid>
                        </Grid>}
                    />
                    <CardContent>
                        {caps.map(c =>
                            <Tooltip title={c.capabilityDescription && <Typography paragraph dangerouslySetInnerHTML={{ __html: c.capabilityDescription }}></Typography>}>
                                <Chip className={classes.chip} variant="outlined" label={c.capabilityText && c.capabilityText} avatar={c.capabilityText && matches && <Avatar>{c.capabilityText.charAt(0)}</Avatar>} />
                            </Tooltip>
                        )}
                    </CardContent>
                </Card >
            </Grid>
        );
    }

    const renderMarketingSuccessStories = () => {
        return (
            <MarketingWrapper title={"Our Customer Love Us"}>
                {successStoriesContent()}
            </MarketingWrapper>
        );
    }

    const successStoriesContent = () => {
        return (
            <SwipeableViews
                index={activeStep}
                onChangeIndex={handleStoryChange}
            >
                {trackdetail.successStories.map(g => {
                    return <Box display="flex" alignItems="center" justifyContent="space-between" style={{ overflow: "hidden" }}>
                        {matches && <Button style={{ transform: "scaleX(-1)" }} size="small" onClick={handlePreviousStory} disabled={activeStep === 0} className={classes.prevIcon + ' btnss'} fontSize="large" >
                            <PlayCircleFilledIcon />
                        </Button>}
                        <Grid container className={classes.successStoryItem}>
                            <Grid item xs={12} className={classes.mobileGridItem}>
                                <Card elevation={5} variant="outlined">
                                    <CardHeader
                                        avatar={g.name &&
                                            <Avatar aria-label="recipe">
                                                {g.name.charAt(0)}
                                            </Avatar>
                                        }
                                        title={<Typography className={classes.sameLine}>{g.name && g.name}</Typography>}
                                        subheader={<Typography className={classes.successStoriesHeading} paragraph dangerouslySetInnerHTML={{ __html: g.profile }}></Typography>}
                                    />
                                    {g.videoURL &&
                                        <CardMedia
                                            component="iframe"
                                            className={classes.media}
                                            image={g.videoURL}
                                            controls
                                        />
                                    }
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <Typography paragraph dangerouslySetInnerHTML={{ __html: g.description }}></Typography>
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>
                        </Grid>
                        {matches && <Button size="small" onClick={handleNextStory} disabled={activeStep ===
                            trackdetail.successStories.length - 1} className={classes.nextIcon + ' btnss'} style={{ fontSize: 50 }}>
                            <PlayCircleFilledIcon />
                        </Button>}
                    </Box>
                }
                )}
            </SwipeableViews>
        );
    }

    const renderSuccessStories = () => {
        return (
            trackdetail.successStories && !!trackdetail.successStories.length && <Grid item xs={12} className={classes.mobileGridItem}>
                {(trackdetail?.templateType === TemplateTypes.MARKETING && matches) &&
                    <Box display="flex" justifyContent="center" style={{ width: "100%" }}>
                        <Paper elevation={5} variant="outlined" square={true}><h3 className={classes.keyPoints}>{'OUR CUSTOMER LOVE US'}</h3></Paper>
                    </Box>}
                <Card className={classes.container}>
                    {(trackdetail?.templateType === TemplateTypes.DEFAULT || !matches) && <CardHeader
                        title={<Grid container spacing={3} className={classes.mb0}>
                            <Grid item justify="center" xs={12} sm={12}>
                                <Paper elevation={5} variant="outlined" justify="center" square={true}><h2 className={classes.keyPoints}>{"OUR CUSTOMER LOVE US"}</h2></Paper>
                            </Grid>
                        </Grid>}
                    />}
                    <CardContent>
                        {successStoriesContent()}
                    </CardContent>
                </Card >
            </Grid >
        );
    }

    const renderFreeButton = (t) => {
        if (!t) {
            t = trackdetail && trackdetail.productInfo && !!trackdetail.productInfo.length && trackdetail.productInfo.find(t => t.subProductType === planTypes.TRACKPLANFREE);
        }
        if (!t) return;
        return <Button type="button" component="button" variant="contained" classes={{ root: classes.registerBtnRoot }} disableRipple onClick={enrollFreePlan}>
            {'Enroll Now'}
        </Button>
    }

    const renderHorizontalPlan = (type) => {
        return (
            trackdetail && trackdetail.productInfo && !!trackdetail.productInfo.length &&
            <MarketingWrapper title={"Choose from our packages to enroll"}>
                <Grid container spacing={2} className={classes.capabilityWrapper}>
                    {trackdetail && trackdetail.productInfo && !!trackdetail.productInfo.length && trackdetail.productInfo.filter(t => type ? t.subProductType === type : true).map((t, inx) => {
                        let btnText;
                        let onClickCTA;
                        if (t.subProductType === planTypes.TRACKPLANSUBSCRIPTION) {
                            btnText = 'Buy Now';
                            onClickCTA = () => window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lptrackid=${trackdetail.trackId}&lpproductid=${t.productId}&lpflowtype=buy`;
                        }
                        else if (t.subProductType === planTypes.TRACKPLANCONTRACT) {
                            btnText = "Let's Connect";
                            onClickCTA = () => setOpen(true);
                        }
                        else if (t.subProductType === planTypes.TRACKPLANEVALUATION) {
                            btnText = 'Buy Now';
                            onClickCTA = () => window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lptrackid=${trackdetail.trackId}&lpproductid=${t.productId}&lpflowtype=evalbuy`;
                        } else if (t.subProductType === planTypes.TRACKPLANPLACEMENT) {
                            btnText = 'Enroll Now';
                            onClickCTA = () => window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lptrackid=${trackdetail.trackId}&lpproductid=${t.productId}&lpflowtype=placement&company=${trackdetail.placementPartner && trackdetail.placementPartner.name}`;
                        } else if (t.subProductType === planTypes.TRACKPLANFREE) {
                            btnText = 'Enroll Now';
                            onClickCTA = () => enrollFreePlan();
                        }
                        return (<Grid item md={4} sm={6} xs={12}>
                            <PlanCard
                                listItems={t.displayDescription}
                                onCTAClick={onClickCTA}
                                ctaText={btnText}
                                headingText={t.planName}
                                priceContent={!!t.price && (t.price > 0 ? ('$ ' + t.price + '/Mo') : 'Free')}
                                theme={{ color: colorsArray.length > inx + 1 ? colorsArray[colorsArray.length - inx - 1] : "#ccc" }}
                            />
                        </Grid>);
                    })}
                </Grid>
            </MarketingWrapper>
        );
    }

    const renderPlan = (type) => {
        return (
            trackdetail && trackdetail.productInfo && !!trackdetail.productInfo.length && trackdetail.productInfo.filter(t => type ? t.subProductType === type : true).map(t => {
                return <Grid item xs={12} className={classes.mobileGridItem}>
                    <Card className={classes.container}>
                        {!!t.price && <CardHeader
                            title={
                                <Box display="flex" justifyContent="center">
                                    <Typography variant="h5">
                                        {t.price > 0 ? ('$ ' + t.price + ((t.recurringPriceType && t.recurringPriceType.toLowerCase()) === "month" ? '/Mo' : '/Yr')) : 'Free'}
                                    </Typography>
                                </Box>}
                        />}
                        <CardContent className={classes.cardMargin}>
                            <Grid container spacing={3}>
                                <Grid item justify="start" sm={9} xs={12}>
                                    <Paper elevation={5} variant="outlined" square={true} className={classes.marginTop}><h2 className={classes.keyPoints}>
                                        {(t && t.subProductType === planTypes.TRACKPLANCONTRACT) ? 'Want to know about Unlimited plan?' : 'What you will get !'}
                                    </h2></Paper>
                                </Grid>
                            </Grid>
                            <List className={classes.priceList}>
                                {t.displayDescription && !!t.displayDescription.length && t.displayDescription.map(d => <ListItem key={d}>
                                    <ListItemIcon className={classes.listItemIcon}>
                                        <FontAwesomeIcon icon={faCheck} size='1x' color="#315CD5" />
                                    </ListItemIcon>
                                    <ListItemText primary={
                                        <Typography className={classes.planCheckList}>{d}</Typography>}>
                                    </ListItemText>
                                </ListItem>)}
                            </List>
                            <Box display="flex" justifyContent="center">
                                {(t.subProductType === planTypes.TRACKPLANSUBSCRIPTION) &&
                                    <Button type="button" component="button" variant="contained" classes={{ root: classes.registerBtnRoot }} disableRipple onClick={() => window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lptrackid=${trackdetail.trackId}&lpproductid=${t.productId}&lpflowtype=buy`}>
                                        {'Buy Now'}
                                    </Button>}
                                {(t.subProductType === planTypes.TRACKPLANCONTRACT) &&
                                    <Button type="button" component="button" variant="contained" classes={{ root: classes.registerBtnRoot }} disableRipple onClick={() => setOpen(true)}>
                                        {"Let's Connect"}
                                    </Button>}

                                {(t.subProductType === planTypes.TRACKPLANEVALUATION) &&
                                    <Button type="button" component="button" variant="contained" classes={{ root: classes.registerBtnRoot }} disableRipple onClick={() => window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lptrackid=${trackdetail.trackId}&lpproductid=${t.productId}&lpflowtype=evalbuy`}>
                                        {'Buy Now'}
                                    </Button>}

                                {(t.subProductType === planTypes.TRACKPLANPLACEMENT) &&
                                    <Button type="button" component="button" variant="contained" classes={{ root: classes.registerBtnRoot }} disableRipple onClick={() => window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lptrackid=${trackdetail.trackId}&lpproductid=${t.productId}&lpflowtype=placement&company=${trackdetail.placementPartner && trackdetail.placementPartner.name}`}>
                                        {'Enroll Now'}
                                    </Button>}
                            </Box>
                        </CardContent>
                    </Card >
                </Grid>
            })
        );
    }

    const renderSubscribedPlan = () => {
        return renderPlan(planTypes.TRACKPLANSUBSCRIPTION);
    }

    const renderFreePlan = () => {
        return renderPlan(planTypes.TRACKPLANFREE);
    }

    const renderEvaluationPlan = () => {
        return renderPlan(planTypes.TRACKPLANEVALUATION);

    }

    const renderPlacementPlan = () => {
        return renderPlan(planTypes.TRACKPLANPLACEMENT);
    }

    const renderUnlimitedPlan = () => {
        return renderPlan(planTypes.TRACKPLANCONTRACT);
    }

    const enrollFreePlan = () => {
        const t = trackdetail && trackdetail.productInfo && !!trackdetail.productInfo.length && trackdetail.productInfo.find(t => t.subProductType === planTypes.TRACKPLANFREE);
        if (t) {
            window.location.href = process.env.REACT_APP_EVAL_URL + `${search ? (search + '&') : '?'}lptrackid=${trackdetail.trackId}&lpproductid=${t.productId}&lpflowtype=enroll`
        } else {
            alert("No free plan available for this track!")
        }
    }

    const renderFreeBies = () => {
        return (
            trackdetail && trackdetail.freeBies && !!trackdetail.freeBies.length && <Grid item xs={12} className={classes.mobileGridItem}>
                <Card className={classes.container}>
                    <CardContent className={classes.cardMargin}>
                        <Grid container spacing={3}>
                            <Grid item justify="start" sm={9} xs={12}>
                                <Paper elevation={5} variant="outlined" square={true}><h2 className={classes.keyPoints}>{'FreeBies'}</h2></Paper>
                            </Grid>
                        </Grid>
                        <List>
                            {trackdetail && trackdetail.freeBies && trackdetail.freeBies.map(d => <ListItem key={d}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <Avatar src={d.logo} aria-label="recipe" className={classes.avatar}>
                                        {(d.title || "").charAt(0)}
                                    </Avatar>
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Typography className={classes.planCheckList}>
                                        <Link href={d.url}>
                                            {d.title}
                                        </Link>
                                    </Typography>}>
                                </ListItemText>
                            </ListItem>)}
                        </List>
                    </CardContent>
                </Card >
            </Grid>

        );
    }

    const renderFaqs = () => {
        return (
            trackdetail.faqs && !!trackdetail.faqs.length && <Grid item xs={12} className={classes.mobileGridItem}>
                <Card className={classes.container}>
                    <CardHeader
                        title={<Grid container spacing={3}>
                            <Grid item justify="center" xs={12} sm={9}>
                                <Paper elevation={5} variant="outlined" justify="center" square={true}><h2 className={classes.keyPoints}>{'FAQs'}</h2></Paper>
                            </Grid>
                        </Grid>}
                    />
                    <CardContent>
                        {trackdetail.faqs.map((g, inx) =>
                            <Fragment key={inx}>
                                <Card>
                                    <CardHeader
                                        title={<Typography variant="h5" className={classes.sameLine}>{g.question && g.question}</Typography>}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <Typography paragraph dangerouslySetInnerHTML={{ __html: g.answer }}></Typography>
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Divider />
                            </Fragment>)}
                    </CardContent>
                </Card >
            </Grid>
        )
    }

    const getSEOScript = () => {
        return JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage ",
            "mainEntity ": trackdetail?.faqs?.map((f, inx) => {
                return {
                    "@type": "Question ",
                    "name ": f.question,
                    "acceptedAnswer ": {
                        "@type": "Answer ",
                        "text ": f.answer
                    }
                }
            }),
        });
    }

    const renderRelatedTracks = () => {
        return (
            trackdetail.relatedTracks && !!trackdetail.relatedTracks.length && <Grid item xs={12} className={classes.mobileGridItem}>
                <Card className={classes.container}>
                    <CardHeader
                        title={<Grid container spacing={3}>
                            <Grid item justify="center" xs={12} sm={9}>
                                <Paper elevation={5} variant="outlined" justify="center" square={true}><h2 className={classes.keyPoints}>{'Related Tracks'}</h2></Paper>
                            </Grid>
                        </Grid>}
                    />
                    <CardContent>
                        {trackdetail.relatedTracks.map((g, inx) =>
                            <Fragment key={inx}>
                                <Card>
                                    <CardHeader
                                        title={<Link href={g.title}><Typography variant="h5" className={classes.sameLine}>{g.title}</Typography></Link>}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <Typography paragraph dangerouslySetInnerHTML={{ __html: g.description }}></Typography>
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            <Typography paragraph dangerouslySetInnerHTML={{ __html: g.detailsDescription }}></Typography>
                                        </Typography>
                                    </CardContent>
                                </Card>
                                <Divider />
                            </Fragment>)}
                    </CardContent>
                </Card >
            </Grid>
        );
    }

    useEffect(() => {
        (async () => {
            if (trackname) {
                var updatedTrackName = removeTrackSpaces(trackname);
                window.history.replaceState({}, document.title, updatedTrackName);
                var result = await post('getTrackDetails', { title: updatedTrackName });
                result && result.data && result.data.output && settrackdetail(result.data.output);
            }
        })();
    }, [trackname])

    return (
        <>
            {trackdetail && <Meta
                title={(trackdetail.seo?.metaTitle || trackdetail.title || "").substring(0, 60)}
                description={(trackdetail.seo?.metaDescription || trackdetail.description || "").substring(0, 150)}
                canonical={trackdetail.seo?.canonicalTag}
                script={getSEOScript()}
                h1={trackdetail.seo?.h1}
                h2={trackdetail.seo?.h2}
                keywords={trackdetail.seo?.keywords}
            />}
            { (trackdetail?.templateType === TemplateTypes.CUSTOMIZED) ? <TracksUpdated onAction={enrollFreePlan} /> :
                <Grid container className={classes.root} spacing={3}>
                    <Box marginTop={4} display="flex" justifyContent="center" style={{ width: "100%" }}>
                        {trackdetail && trackdetail.trackPitch?.title && <Typography variant="h6">{trackdetail.trackPitch?.title}</Typography>}
                    </Box>
                    {(trackdetail?.templateType === TemplateTypes.MARKETING) &&
                        <>
                            <Grid item sm={12} xs={12} className={classes.mobileGridItem}>
                                {renderTrackInfo()}
                            </Grid>
                            <Grid item sm={12} xs={12} className={classes.mobileGridItem}>
                                {renderProcess()}
                            </Grid>
                            <Grid item sm={12} xs={12} className={classes.mobileGridItem}>
                                {renderCategories()}
                            </Grid>
                            <Grid item sm={12} xs={12} className={classes.mobileGridItem}>
                                <Grid container spacing={2} >
                                    {renderHorizontalPlan()}
                                </Grid>
                            </Grid>
                            {!!trackdetail.successStories && !!trackdetail.successStories.length && <Grid item sm={12} xs={12} className={classes.mobileGridItem}>
                                {renderMarketingSuccessStories()}
                            </Grid>}
                        </>}
                    {(trackdetail?.templateType === TemplateTypes.DEFAULT) && matches && <>
                        <Grid item sm={8} xs={12} className={classes.mobileGridItem}>
                            {trackdetail && <>
                                <Grid container spacing={2} >
                                    {renderTrackInfo()}
                                    {renderKeyPoints()}
                                    {renderCapabilities()}
                                    {renderSuccessStories()}
                                    {renderRelatedTracks()}
                                    {renderFaqs()}
                                </Grid>
                            </>}
                        </Grid>
                        <Grid item sm={4} xs={12} className={classes.mobileGridItem}>
                            <Grid container justify="center" direction="column" spacing={3}>
                                {renderPlan()}
                                {renderFreeBies()}
                            </Grid>
                        </Grid>
                    </>}
                </Grid>}
            {(trackdetail?.templateType === TemplateTypes.DEFAULT) && !matches && <Grid container className={classes.root} spacing={3}>
                <Grid item sm={8} xs={12} className={classes.mobileGridItem}>
                    {trackdetail && <>
                        <Grid container spacing={2} >
                            {renderTrackInfo()}
                            {renderKeyPoints()}
                            {renderSubscribedPlan()}
                            {renderFreePlan()}
                            {renderEvaluationPlan()}
                            {renderPlacementPlan()}
                            {renderCapabilities()}
                            {renderSuccessStories()}
                            {renderRelatedTracks()}
                            {renderFaqs()}
                            {renderUnlimitedPlan()}
                            {renderFreeBies()}
                        </Grid>
                    </>}
                </Grid>
            </Grid>
            }
            {trackdetail && <LetsConnectModal
                {...modalProperties}
                defaultComment={`I am interested in ${trackdetail.title} unlimited plan.`}
                open={open}
                handleClose={closeNextConnectModal}
                message={message}
                enrollFreePlan={enrollFreePlan}
                customMsg={{
                    thankyouMsg: "Thank you for showing your interest in unlimited plan",
                    freePlanMsg: "We are happy to let you know that we have a FREE plan also. Until we customize option for you why don't you try FREE options",
                    headerMsg: "Please provide us following information so that we can get back to you with customized options"
                }}
            />}

            {currentCategory && <CapabilityModal
                {...modalProperties}
                currentCategory={currentCategory}
                handleClose={closeCategoryModal}
            />}

        </>
    )
}
