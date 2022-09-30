import useJobDispatcher from "containers/HiringManager/Jobs.util";
import React, { useEffect } from "react";
import { Wrapper } from "./styles";
import { RootState } from "store";
import { useSelector } from "react-redux";
import NotificationCard from './NotificationCard';

const Notifications = () => {
    const state = useSelector((state: RootState) => state);
    const { expertId } = state.auth.user;
    const { jobDeskDetails } = state.jobs;
    const { getJobDesk } = useJobDispatcher();

    useEffect(() => {
        if (expertId) {
            getJobDesk({ count: 10, skipCount: 0 });
        }
    }, [expertId]);

    return (
        <Wrapper>
            {jobDeskDetails.jobs.map((jobDeskInfo) => (
                <NotificationCard {...jobDeskInfo}/>
            ))}
        </Wrapper>
    );
}

export default Notifications;