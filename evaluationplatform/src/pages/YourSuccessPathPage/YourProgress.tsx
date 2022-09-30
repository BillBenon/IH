import { LinearProgress } from '@material-ui/core';
import styled from 'styled-components';
import React from 'react';

const CardWrapper = styled.div`
    box-shadow: 0 0 20px 0 rgb(76 87 125 / 2%);
    border: 0;
`;

const CardHeading = styled.div`
    font-size: 1.4rem!important;
    font-weight: 700 !important;
    color: #009ef7;
`;

const CardItem = styled.div`
    border-style: dashed!important;
    border-color: #e4e6ef!important;
    border: 1px;
`;

const CardItemHeading = styled.div`
    font-size: 1rem!important;
    font-weight: 600 !important;
`;

const CardItemSubHeading = styled.div`
    color: #b5b5c3!important;
    font-weight: 500!important;
    font-size: 1.075rem!important;
`;

const CardItemRight = styled.div`
    width: 300px;
    margin-top: .75rem!important;
`;

export const YourProgress = () => {
    return (
        <CardWrapper className="card m-3">
            <div className="card-body pt-9 pb-0">
                <div className="d-flex flex-wrap flex-sm-nowrap">
                    <div className="flex-grow-1">
                        <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                            <div className="d-flex flex-column">
                                <div className="d-flex align-items-center mb-2">
                                    <CardHeading>Your Progress</CardHeading>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-wrap flex-stack">
                            <div className="d-flex flex-column flex-grow-1 pr-5">
                                <div className="d-flex flex-wrap">
                                    <CardItem className="py-3 px-4 mr-3 mb-3">
                                        <div className="d-flex align-items-center">
                                            <CardItemHeading>Technical Program Manager</CardItemHeading>
                                        </div>
                                        <CardItemSubHeading className="mt-1">Current Track</CardItemSubHeading>
                                    </CardItem>
                                    <CardItem className="py-3 px-4 mr-3 mb-3">
                                        <div className="d-flex align-items-center">
                                            <CardItemHeading>Not Submitted</CardItemHeading>
                                        </div>
                                        <CardItemSubHeading className="mt-1">Resume Status</CardItemSubHeading>
                                    </CardItem>
                                    <CardItem className="py-3 px-4 mr-3 mb-3">
                                        <div className="d-flex align-items-center">
                                            <CardItemHeading>30 Min Free</CardItemHeading>
                                        </div>
                                        <CardItemSubHeading className="mt-1">Career Consultancy</CardItemSubHeading>
                                    </CardItem>
                                </div>
                            </div>
                            <CardItemRight className="d-flex align-items-center w-200px w-sm-300px flex-column mt-3">
                                <div className="d-flex justify-content-between w-100 mt-auto mb-2">
                                    <CardItemSubHeading>Question Answered</CardItemSubHeading>
                                    <CardItemHeading>50/100</CardItemHeading>
                                </div>
                                <div className="h-5px mx-3 w-100 bg-light mb-3">
                                    <LinearProgress variant="determinate" value={50} />
                                </div>
                            </CardItemRight>
                        </div>
                    </div>
                </div>
            </div>
        </CardWrapper>
    )
}
