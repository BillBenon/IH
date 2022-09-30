import { Box, FormControl } from "@material-ui/core";
import {
  Check,
  KeyboardArrowDown,
  KeyboardArrowUp,
  SearchRounded,
} from "@material-ui/icons";
import debounce from "lodash/debounce";
import React, { useState, useRef } from "react";
import AliceCarousel from "react-alice-carousel";
import { TrackSearchTypes, TrackTags, JourneyList } from "../../utils/Constants";
import "./TrackSearch.css";

export const TrackSearch = ({ handleSearch }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [textToSearch, setTextToSearch] = useState("");
  const debounceLoadData = useRef(
    debounce((filter) => {
      onTextSearch(filter);
    }, 1000)
  );

  const journeyList = JourneyList;

  const tags = TrackTags;

  const onDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  const onJourneyClick = (event, journey) => {
    setTextToSearch(journey.text);
    handleSearch && handleSearch(TrackSearchTypes.JOURNEY, journey.val, journey.text);
    event.stopPropagation();
    setTimeout(() => {
      setShowDropdown(false);
    }, 300);
  };

  const onTagClick = (val) => {
    setTextToSearch(val);
    handleSearch && handleSearch(TrackSearchTypes.TAGS, val, val);
  };

  const onTextSearch = (value) => {
    handleSearch && handleSearch(TrackSearchTypes.CUSTOM_SEARCH, value, value);
  };

  const handleFilterChange = (e) => {
    let searchText = e.target.value;
    setTextToSearch(searchText);
    debounceLoadData && debounceLoadData.current(searchText);
  };

  const responsive = {
    0: { items: 2 },
    568: { items: 9 },
    1024: { items: 10 },
  };

  return (
    <div className="search-wrapper">
      <h1 className="heading1">{"Solving Your Job Problems"}</h1>
      <h2 className="heading2">
        {
          "Everything you need to be successful in your FAANG companies interview. \n InterviewHelp is your Eco-system to get success in your FAANG companies interview"
        }
      </h2>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        className="margin-control"
      >
        <Box className="boxwrapper" display="flex" justifyContent="center">
          <FormControl className="w-100">
            <div className="input-wrapper">
              <SearchRounded className="filter-icon" />
              <input
                className="input-box"
                onChange={handleFilterChange}
                value={textToSearch}
                placeholder="Search here or choose your job journey from drop down"
              />
              <div className="inputDrop" onClick={onDropdownClick}>
                {!showDropdown ? (
                  <KeyboardArrowDown className="filter-icon" />
                ) : (
                  <KeyboardArrowUp className="filter-icon" />
                )}
              </div>
            </div>
            {showDropdown && (
              <>
                <div
                  className="dropdownWrapper"
                  onClick={() => setShowDropdown(false)}
                ></div>
                <div className="dropdown-frame">
                  {journeyList.map((journey) => (
                    <div
                      onClick={(event) => onJourneyClick(event, journey)}
                      className="dropdown-item"
                    >
                      <span
                        style={
                          textToSearch === journey.text
                            ? {
                                color: "#315CD5",
                                textDecorationLine: "underline",
                              }
                            : {}
                        }
                      >
                        {journey.text}
                      </span>
                      {textToSearch === journey.text && (
                        <Check className="check-icon" />
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </FormControl>
        </Box>
      </Box>
      <div className="carousel-wrapper">
        <AliceCarousel
          infinite
          items={tags.map((tag) => (
            <div key={tag} onClick={() => onTagClick(tag)} className="tagItem">
              {tag}
            </div>
          ))}
          responsive={responsive}
          controlsStrategy="alternate"
          disableDotsControls
        />
      </div>
    </div>
  );
};
