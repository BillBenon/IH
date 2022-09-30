import React from "react";
import { Wrapper } from './styles';
import { Notifications } from '../Notifications';
import { JobsInfo } from '../JobsInfo';
import { useSelector } from "react-redux";
import { RootState } from "store";
import { useLoader } from "context/loaderContext";

const MyDeskContainer = () => {
    const Loader = useLoader();
    const state = useSelector((state: RootState) => state);
    const { loading } = state.jobs;

    loading ? Loader.showLoader() : Loader.hideLoader();

    return (
        <Wrapper>
            <Notifications />
            <JobsInfo />
        </Wrapper>
    );
};

export default MyDeskContainer;