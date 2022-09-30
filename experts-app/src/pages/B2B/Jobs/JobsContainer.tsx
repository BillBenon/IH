import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { isMobile } from 'react-device-detect';
import { AddCircle } from '@styled-icons/fluentui-system-filled/AddCircle';
import { JobsCard } from "./JobsCard";
import { CreateJob } from "./CreateJob";
import { JobCandidates } from "./JobCandidates";
import useJobDispatcher from 'containers/HiringManager/Jobs.util';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { useLoader } from "context/loaderContext";
import { resetCandidates, setFetchJobs } from "actions/hiringManager/jobs/jobsSlice";
import { CreateJobTitle } from "./Jobs.styled";
import { theme } from '../constants';
import { ProfileModal } from '../Components';
import { getExpertDetails } from "actions/auth/authActions";

const Wrapper = styled.div<{ form: boolean, isMobile: boolean }>`
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;

    ${({ isMobile }) => isMobile ? `
        flex-direction: column;
    ` : `
        .job-card:nth-child(1n), .job-card:nth-child(2n) {
            margin-right: 6%;
        }

        .job-card:nth-child(3n) {
            margin-right: 0 !important;
        }
    `};

    ${({ form }) => form && `
        justify-content: center;
    `};
`;

export const CardWrapper = styled.div<{ createJobCard?: boolean, createCandidateCard?: boolean, borderTop?: string }>`
    position: relative;
    display: flex;
    flex-direction: column;
    background: #fff;
    color: #212529;
    justify-content: space-between;
    align-items: flex-start;
    box-shadow: 0px 0px 20px rgba(22, 52, 134, 0.15);
    border-radius: 10px;
    flex: 0 0 28%;
    padding: 30px 15px 30px 45px;
    font-size: 18px;
    margin-right: 30px;
    margin-bottom: 30px;
    word-break: break-word;
    
    ${({ borderTop }) => borderTop && `
        border-top: 6px solid ${borderTop};
    `};

    ${({ createJobCard }) => createJobCard && `
        padding: 40px;
        justify-content: center;
        align-items: center;
        svg {
            &:hover {
                opacity: 0.8;
                filter: drop-shadow(0 0 40px #969696);
            }
        }
        
    `};
`;

export const JobsContainer = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: RootState) => state.auth);
    const { loadInitialProfileDetails, isHiringManagerProfileUpdated } = useSelector((state: RootState) => state.jobs);
    const [showCreateJobForm, setShowCreateJobForm] = useState<boolean>(false);
    const { expertId } = user;

    useEffect(() => {
        expertId && loadInitialProfileDetails && dispatch(getExpertDetails(expertId));
    }, [expertId]);

    const handleCreateJob = () => {
        setShowCreateJobForm(true);
    };

    return (
        <Wrapper form={showCreateJobForm} isMobile={isMobile}>
            <AllJobs handleCreateJob={handleCreateJob} />
            {showCreateJobForm && (
                <CreateJob setShowCreateJobForm={setShowCreateJobForm} />
            )}
            <ProfileModal show={!isHiringManagerProfileUpdated} />
        </Wrapper>
    );
};

const AllJobs = ({ handleCreateJob }: { handleCreateJob: () => void }) => {
    const Loader = useLoader();
    const dispatch = useDispatch();
    const { getJobs, getJobCandidates } = useJobDispatcher();
    const state = useSelector((state: RootState) => state);
    const { expertId } = state.auth.user;
    const { loading, fetchJobs, jobResults } = state.jobs;
    const [showJobCandidates, setShowJobCandidates] = useState<boolean>(false);
    const [selectedJobId, setSelectedJobId] = useState<string>('');

    loading ? Loader.showLoader() : Loader.hideLoader();

    useEffect(() => {
        if (expertId && fetchJobs) {
            getJobs();
            dispatch(setFetchJobs({ fetchJobs: false }));
        }
    }, [dispatch, expertId, fetchJobs, getJobs]);

    const handleCheckCandidates = (jobId: string) => {
        dispatch(resetCandidates());
        setShowJobCandidates(true);
        setSelectedJobId(jobId);
        getJobCandidates({ jobId });
    }

    if (showJobCandidates) {
        return <JobCandidates jobId={selectedJobId} setShowJobCandidates={setShowJobCandidates} />;
    }

    return (
        <>
            <CreateJobCard handleCreateJob={handleCreateJob} />
            {jobResults.slice().reverse().map((job) => (
                <JobsCard handleCheckCandidates={handleCheckCandidates} {...job} />
            ))}
        </>
    );
}

const CreateJobCard = ({ handleCreateJob }: { handleCreateJob: () => void }) => {
    return (
        <CardWrapper className="job-card" createJobCard>
            <AddCircle cursor='pointer' onClick={handleCreateJob} color={theme.colors.PRIMARY_01} height='4rem' />
            <CreateJobTitle>Create Job</CreateJobTitle>
        </CardWrapper>
    );
};

