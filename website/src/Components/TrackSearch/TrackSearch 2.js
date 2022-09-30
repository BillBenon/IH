import {
    Box, FormControl
} from '@material-ui/core';
import { Check, KeyboardArrowDown, KeyboardArrowUp, SearchRounded } from '@material-ui/icons';
import debounce from 'lodash/debounce';
import React, { useState, useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { TrackSearchTypes, TrackTags } from '../../utils/Constants';
import "./TrackSearch.css";

export const TrackSearch = ({ handleSearch }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [textToSearch, setTextToSearch] = useState("");
    const debounceLoadData = useRef(debounce((filter) => {
        onTextSearch(filter);
    }, 1000))

    const journeyArr = [
        'Confused about your career (Talk to an Expert)',
        'FAANG Interview Preparation',
        'Specific preparation (Coding Design behaviour)',
        'Want a Mock interview',
        'Have a phone screening interview',
        'Have a scheduled interview',
        'Help needed in applying for job',
        'Looking for placement'
    ];

    const tags = TrackTags;

    const onDropdownClick = () => {
        setShowDropdown(!showDropdown);
    }

    const onJourneyClick = (event, val) => {
        setTextToSearch(val);
        handleSearch && handleSearch(TrackSearchTypes.JOURNEY, val);
        event.stopPropagation();
        setTimeout(() => {
            setShowDropdown(false);
        }, 300);
    }

    const onTagClick = (val) => {
        setTextToSearch(val);
        handleSearch && handleSearch(TrackSearchTypes.TAGS, val);
    }

    const onTextSearch = (value) => {
        handleSearch && handleSearch(TrackSearchTypes.CUSTOM_SEARCH, value);
    }

    const handleFilterChange = (e) => {
        let searchText = e.target.value;
        setTextToSearch(searchText);
        debounceLoadData && debounceLoadData.current(searchText);
    };

    const responsive = {
        0: { items: 1 },
        568: { items: 5 },
        1024: { items: 8 },
    };

    return (

        <div>
            <h1 className="heading1">{'Solving Your Job Problems'}</h1>
            <h2 className="heading2">{'Everything you need to be successful in your FAANG companies interview. \n InterviewHelp is your Eco-system to get success in your FAANG companies interview'}</h2>

            <Box display="flex" alignItems="center" justifyContent="center" marginTop="40px">
                <Box>
                    <FormControl>
                        <div className="input-wrapper">
                            <SearchRounded className="filter-icon" />
                            <input
                                className="input-box"
                                onChange={handleFilterChange}
                                value={textToSearch}
                                placeholder="Search here or choose your job journey from drop down"
                            />
                            <div className="inputDrop" onClick={onDropdownClick}>
                                {!showDropdown ? <KeyboardArrowDown className="filter-icon" /> :
                                    <KeyboardArrowUp className="filter-icon" />}
                            </div>
                        </div>
                        {showDropdown &&
                            <>
                                <div className="dropdownWrapper" onClick={() => setShowDropdown(false)}>
                                </div>
                                <div className="dropdown-frame">
                                    {journeyArr.map(journey => <div onClick={(event) => onJourneyClick(event, journey)} className="dropdown-item">
                                        <span
                                            style={textToSearch === journey ? { color: '#315CD5', textDecorationLine: 'underline' } : {}}>
                                            {journey}</span>
                                        {textToSearch === journey && <Check className="check-icon" />}
                                    </div>)}
                                </div>
                            </>
                        }
                    </FormControl>
                </Box>
            </Box>
            <div className="carousel-wrapper">
                <AliceCarousel
                    infinite
                    items={tags.map(tag => <div key={tag} onClick={() => onTagClick(tag)} className="tagItem">{tag}</div>)}
                    responsive={responsive}
                    controlsStrategy="alternate"
                    disableDotsControls
                />
            </div>
        </div>
    )
}