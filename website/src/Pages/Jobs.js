import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { post } from "../utils/axiosInstance";
import JobsCardContent from "../Components/JobsCardContent";

import {
    Card,
    CircularProgress,
    FormControl,
    Grid,
    Typography,
    Box,
} from "@material-ui/core";
import { SearchRounded } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
    root: {
        padding: "110px 0px",
        margin: "0 2rem",
        [theme.breakpoints.only("xs")]: {
            padding: "85px 25px",
            width: "100%",
            margin: "0 auto",
        },
        [theme.breakpoints.down("sm")]: {
            textAlign: "center",
        },
    },
    subHeading: {
        textAlign: "center",
        fontSize: "17px",
        fontWeight: "300",
        paddingLeft: '13px',
        width: '100% !important',
    },
    circularLoader: {
        width: "60px",
        height: "60px",
        position: "absolute",
        margin: "0 auto",
        top: "45%",
        left: "0",
        right: "0",
        zIndex: 1,
    },
    card: {
        margin: theme.spacing(2),
        padding: "5px",
        boxShadow:
            "0px 4px 4px rgba(51, 51, 51, 0.04), 0px 4px 16px rgba(51, 51, 51, 0.08)",
        [theme.breakpoints.only("xs")]: {
            margin: "0",
            height: "auto",
        },
        [theme.breakpoints.down("sm")]: {
            height: "100%",
        },
    },
    grid: {
        [theme.breakpoints.only("xs")]: {
            marginLeft: "0px !important",
        },
    },
    parent: {
        [theme.breakpoints.down("sm")]: {
            rowGap: "20px",
        },
        [theme.breakpoints.only("xs")]: {
            gap: "20px",
        },
    },
    subHeadingText: {
        margin: "20px"
    },
    icon: {
        height: 'inherit !important',
        width: 'inherit !important'
    },
    filterRoot: {
        flexGrow: 1,
    },
    formControl: {
        minWidth: '30%',
        [theme.breakpoints.down("sm")]: {
            width: '100%',
        }
    },
    JobSearchFormControl: {
        width: '100%',
    },
    searchBox: {
        width: '30%',
        marginBottom: '35px',
        [theme.breakpoints.down("sm")]: {
            width: '100%',
        }
    },
    inputWrapper: {
        border: '0.5px solid #c4c4c4',
        boxShadow: '0px 4px 4px rgb(51 51 51 / 4%), 0px 4px 16px rgb(51 51 51 / 8%)',
        borderRadius: '40px',
        height: '56px',
        padding: '10px 0px 10px 20px',
        display: 'flex',
        alignItems: 'center',
        background: '#fff'
    },
    SelectField: {
        '& .MuiSelect-icon': {
            top: 0,
        }
    },
    paper: {
        height: 140,
        width: 100,
    },
    filterContainer: {
        textAlign: 'center',
        [theme.breakpoints.down("sm")]: {
            padding: '12px'
        }
    },
    filterItem: {
        padding: '5px 28px !important',
        [theme.breakpoints.down("sm")]: {
            padding: '0px !important',
            marginBottom: '10px !important',
            marginLeft: '0px !important'
        }
    },
    heading:{
        fontWeight: 600,
        fontSize: '48px',
        lineHeight: '57px',
        color: '#18191f',
        display: 'flex',
        justifyContent: 'center',
        textTransform: 'capitalize',
        margin:0
    },
    resultTitle: {
        color: "#767676",
        fontSize: "18px",
        lineHeight: "21px",
        paddingLeft: '13px',
        [theme.breakpoints.only('xs')]: {
            paddingLeft: '0',
            marginBottom: '20px'
        }
    },
    headingWrapper:{
        display:'block !important'
    }
    
}));
export default function Jobs() {
    const classes = useStyles();

    const [tracks, setTracks] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [searchJob, setSearchJob] = useState('');

    useEffect(() => {
        setShowLoader(true);
        getTracks().then(() => setShowLoader(false));
    }, []);
    
    async function getTracks() {

        const header = {
            textToSearch: "",
            "enrollType": "FOR_PLACEMENT"
        };
        let result = await post("getTracks", header);
        result &&
            result.data.output &&
            result.data.output.tracks &&
            setTracks(result.data.output.tracks)
    }

    function handleApplyNowClick(item) {
        if(item.landingPageUrl){
            window.location.href = item.landingPageUrl;
        }
    }

    const filterTrack = (track, search) => {
        return track.title.toLowerCase().includes(search.toLowerCase()) || track.description.toLowerCase().includes(search.toLowerCase())
    }

    const TrackCardList = ({ tracksList }) => {
        return (
            <>
            {searchJob && <div className={classes.resultTitle}>{'Showing results for “' + searchJob + '”'}</div>}
            <Grid container className={classes.parent}>
                {tracksList
                    .filter((track) => (searchJob ? filterTrack(track, searchJob) : true))
                    .map((item, index) => (
                        <Grid
                            key={`Track_${index}`}
                            className={classes.grid}
                            justify="start"
                            lg={4}
                            md={4}
                            sm={4}
                            xs={12}
                        >
                            <Card className={classes.card} key={index}>
                                <JobsCardContent
                                    item={item}
                                    onApplyNowClick={handleApplyNowClick}
                                />
                            </Card>
                        </Grid>
                    ))}
            </Grid>
            </>
        );
    };


    return (
        <div className={classes.root}>
            {showLoader && <CircularProgress className={classes.circularLoader} />}
            <div className={classes.headingWrapper}>
                <h1 className={classes.heading}>{"Jobs"}</h1>
                <div className={classes.subHeading}>
                    <Typography variant="h6" className={classes.subHeadingText} gutterBottom component="div">
                    InterviewHelp directly connects the candidate with hiring managers. We help you streamline that process by matching you with opportunities in our network and matching you with the best opportunities. By hiring with us, you will be connected to top organizations hiring managers, who will help you land your dream job.
                    </Typography>
                </div>
            </div>


            <Grid container spacing={3} justifyContent="center" className={classes.filterContainer}>

                <Grid item xs={12} className={classes.filterItem}>
                    <Box display="flex" alignItems="center" justifyContent="center" >
                        <Box className={classes.searchBox}>
                            <FormControl
                                className={classes.JobSearchFormControl}

                            >
                                <div
                                    className={classes.inputWrapper}
                                >
                                    <SearchRounded className="filter-icon" />
                                    <input
                                        className="input-box"
                                        onChange={(e) => setSearchJob(e.target.value)}
                                        value={searchJob}
                                        placeholder="Search job Title"
                                    />
                                </div>
                            </FormControl>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <TrackCardList tracksList={tracks} />
        </div>
    );
}
