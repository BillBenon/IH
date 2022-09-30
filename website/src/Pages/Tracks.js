import {Box, CircularProgress, Divider, Grid, makeStyles} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TrackCard from '../Components/TrackCard';
import { TrackSearch } from '../Components/TrackSearch/TrackSearch';
import { post } from '../utils/axiosInstance';
import { TrackSearchTypes } from '../utils/Constants';
import { useHistory } from "react-router-dom"

const useStyles = makeStyles((theme) => ({
    root: {
        padding: "110px 0px",
        margin: "0 2rem",
        [theme.breakpoints.only('xs')]: {
            padding: "85px 25px",
            width: "100%",
            margin: "0 auto",
        },
    },
    inputSearch: {
        '& > *': {
            margin: '0px -10px',
            width: '40ch',
        },
    },
    toggleButton: {
        margin: theme.spacing(2),
    },
    toolbar: {
        '& > *': {
            marginTop: theme.spacing(2),
        }
    },
    circularLoader: {
        width: "60px",
        height: "60px",
        position: "absolute",
        margin: "0 auto",
        top: "50%",
        left: "0",
        right: "0",
        zIndex: 1
    },
    emptyText: {
        color: "#767676",
        fontSize: "24px",
        lineHeight: "28px",
        fontFeatureSettings: "'salt' on, 'liga' off",
        margin: "40px 0px",
        display: 'flex',
        justifyContent: 'center',
        [theme.breakpoints.only('xs')]: {
            fontSize: "18px",
            lineHeight: "150%",
            textAlign: "center",
        },
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
    }
}));

export const Tracks = () => {
    const history = useHistory()
    const [tracks, setTracks] = useState();
    const classes = useStyles();
    const [textToSearch, setTextToSearch] = useState('');
    const [skipCount, handleSkipCount] = useState();
    const [size, setSize] = useState();
    const [count, setCount] = useState(12);
    const [showLoader, setshowLoader] = useState(false);
    const [products, setProducts] = useState([]);
    const { search } = useLocation();
    const _queryParams = queryString.parse(search);

    const handleSearch = async (type, val, text) => {
        setTextToSearch(text);
        setshowLoader(true);
        const header = {
            searchType: type,
            searchText: val,
            count: count,
            skipCount: skipCount,
            flags: {
                case_sensitive: false,
                exact_match: false
            }
        }
        if (type === TrackSearchTypes.CUSTOM_SEARCH) {
            handleQueryParam(val, type);
        }
        var result = await post('getTrackSearch', header);
        result && result.data.output && result.data.output.tracks && setTracks(result.data.output.tracks);
        result && result.data.output && result.data.output.totalCount && setSize(result.data.output.totalCount);
        result && result.data.output && result.data.output.tracks && addProducts(result.data.output.tracks);
        setshowLoader(false);
    }

    const handleQueryParam = (val, type) => {
        if (type === TrackSearchTypes.CUSTOM_SEARCH) {
            const params = new URLSearchParams();
            if (val) {
                params.append("search", val)
            } else {
                params.delete("search")
            }
            history.push({ search: params.toString() })
        }
    }

    const handlePaginationChange = (event, value) => {
        handleSkipCount(value);
    };

    function addProducts(tracks) {
        let productList = [];
        tracks.forEach(track => {
            if (track.productInfos && track.productInfos.length) {
                productList = [...productList,...track.productInfos];
            }
        });
        setProducts(productList);
    }
    useEffect(() => {
        if (_queryParams.search) {
            handleSearch(TrackSearchTypes.CUSTOM_SEARCH, _queryParams.search)
        }
        else if (_queryParams.tags) {
            handleSearch(TrackSearchTypes.TAGS, _queryParams.tags)
        }
    }, [])

    return (
        <div className={classes.root}>
            {showLoader && <CircularProgress className={classes.circularLoader}/>}
            <TrackSearch handleSearch={handleSearch}/>
            <Divider className="divider"/>
            {tracks && tracks.length ? <>
                    <div className={classes.resultTitle}>{'Showing results for “' + textToSearch + '”'}</div>
                    <Grid container>
                        <TrackCard productsList={products} tracksList={tracks}/>
                    </Grid>
                </> :
                <div
                    className={classes.emptyText}>{'We’ve helped 1000+ people build a career they dreamed about!'}</div>}
            <Box marginTop={10} display="flex" alignItems="center" justifyContent="flex-end">
                <Pagination variant="outlined" count={Math.floor(size / count) + 1} hidePrevButton={true}
                            hideNextButton={true} shape="rounded" onChange={handlePaginationChange}
                            skipCount={skipCount}/>
            </Box>
        </div>
    )
}
