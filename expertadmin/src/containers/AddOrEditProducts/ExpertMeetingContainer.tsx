import { BoldSpan } from 'components/CommonStyles';
import moment from "moment";
import React from 'react';
import { expertMeetingData } from 'types';

type ExpertMeetingContainerType = {
    expertMeetings: expertMeetingData[];
}

export const ExpertMeetingContainer = (props: ExpertMeetingContainerType) => {
    const { expertMeetings } = props;
    return <>
        {expertMeetings.length > 0 ? <>
            <BoldSpan>{'Below are their’s scheduled upcoming meetings'}</BoldSpan>
            {expertMeetings.map((ele: any) => (
                <ul
                    key={ele._id}
                    style={{ border: "1px solid black", marginTop: "10px" }}
                >
                    <li style={{ display: "flex" }}>
                        <span style={{ fontSize: "10px", marginRight: "5px" }}>
                            <strong> Time:</strong>{" "}
                            {moment(ele.meetingTime).format(
                                "dddd, MMMM Do YYYY HH:mm:ss A,"
                            )}{" "}
                        </span>
                    </li>

                    <li style={{ display: "flex" }}>
                        <span style={{ fontSize: "10px" }}>
                            <strong> Meeting Title:</strong> {ele.meetingTitle}{" "}
                        </span>{" "}
                        <br></br>
                    </li>

                    <li style={{ display: "flex" }}>
                        <span style={{ fontSize: "10px", marginRight: "5px" }}>
                            <strong> Purpose:</strong> {ele.meetingPurpose}{" "}
                        </span>{" "}
                        <br></br>
                    </li>

                    <li style={{ display: "flex" }}>
                        <span style={{ fontSize: "10px", marginRight: "5px" }}>
                            <strong> Candidate:</strong> {ele.candidateName}{" "}
                        </span>
                    </li>
                </ul>
            ))}
        </> : <h5 style={{ textAlign: "center", marginTop: "200px" }}>
            No Meetings Found
        </h5>}
    </>
}
