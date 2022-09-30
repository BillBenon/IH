import React from "react";
import { Wrapper, CardWrapper, CardTitle, Count } from "./styles";
import { RootState } from "store";
import { useSelector } from "react-redux";

const JobsInfo = () => {
    const state = useSelector((state: RootState) => state);
    const { jobDeskDetails } = state.jobs;
    const { totalVettedCandidates, totalFinalizedCandidates } = jobDeskDetails;

    return (
        <Wrapper>
            <CardWrapper>
                <CardTitle>
                    Total Vetted Candidates
                </CardTitle>
                <Count>
                    {totalVettedCandidates}
                </Count>
            </CardWrapper>
            <CardWrapper>
                <CardTitle>
                    Total Finalized Candidates
                </CardTitle>
                <Count>
                    {totalFinalizedCandidates}
                </Count>
            </CardWrapper>
        </Wrapper>
    );
}

export default JobsInfo;