import { TriggerElm } from 'components/Common/CollapsibleTriggerElement';
import { useLoader } from 'context/loaderDots';
import React, { useEffect, useState } from 'react';
import Collapsible from 'react-collapsible';
import styled from 'styled-components';
import { IProductsForCandidate } from 'types/Payments';
import { notEmpty } from 'utilities';
import { usePlanProducts } from './usePlanProducts';

const PaymentHistoryDiv = styled.div`
    padding: 1rem;

    .Collapsible__contentInner {
        padding: 1rem 2rem 2rem;
    }

    .card-ih {
        margin-bottom: 1rem;

        .card-content {
            display: flex;
            justify-content: space-between;
            padding: 2rem 1rem;
            align-items: center;

            .price {
                color: ${(props) => props.theme.colors.primary};
                font-weight: 700;
                font-size: 1.5rem;
            }

            .question {
                max-width: 750px;
                overflow-x: auto;
            }

            & > div {
                width: 25%;
            }

            &.experthistory {
                padding-bottom: 1rem;

                .expert-company {
                    font-size: 12px;
                    color: ${props => props.theme.colors.secondary}
                }
            }

            &.experthistory > div:nth-child(1) {
                width: 40%;
            }

            &.experthistory > div:nth-child(2) {
                width: 40%;
            }

            &.experthistory > div:nth-child(3) {
                width: 20%;
            }
        }

        .question {
            margin-left: 100px;
            padding-bottom: 2rem;
            font-size: 12px;
            color: ${props => props.theme.colors.secondary};
            .head { font-weight: 300; }
        }
    }
`;

export const PaymentHistory = ({ planHistoryList, questionHistoryList, expertMeetingHistoryList }: IProps) => {

    const getSubscriptionCancellation = (item: any) => {
        if (item.subscriptionProduct && item.cancellationDate) {
            return (
                <div className="text--12 error">
                    <div>{`Cancelled on: ${item.cancellationDate}`}</div>
                    <div>{`Amount refunded: ${item.refundAmount}`}</div>
                </div>
            )
        } else return null;
    }

    return (
        <PaymentHistoryDiv>
            <Collapsible
                trigger={<TriggerElm heading={'Plan'} />}
                triggerWhenOpen={<TriggerElm heading={'Plan'} open={true} />}>
                {planHistoryList && planHistoryList.map((item, index) => (
                    <div key={`planhistory+${index}`} className="card-ih">
                        <div className="card-content">
                            <div className="text--left">{item.date}</div>
                            <div>{item.prodName}</div>
                            <div>
                                <div><b>{item.planType}</b></div>
                                <div>{getSubscriptionCancellation(item)}</div>
                            </div>
                            <div className="price">{item.price}</div>
                        </div>
                    </div>
                ))}
            </Collapsible>
            <Collapsible
                trigger={<TriggerElm heading={'Expert & Question'} />}
                triggerWhenOpen={<TriggerElm heading={'Expert & Question'} open={true} />}>
                {questionHistoryList && questionHistoryList.map((item, index) => (
                    <div key={`questionHistory+${index}`} className="card-ih">
                        <div className="card-content experthistory">
                            <div className="text--left">{item.date}</div>
                            <div className="text--left">
                                <span>{`${item.expertName}`}</span>
                                <span className="expert-company">{` ${item.expertCompany}`}</span>
                            </div>
                            <div className="price">{item.price}</div>
                        </div>
                        <div className="question text--left">
                            <span className="head">{'Question: '}</span>
                            <span>{`${item.questionTitle}`}</span>
                        </div>
                    </div>
                ))}
            </Collapsible>
            <Collapsible
                trigger={<TriggerElm heading={'Expert Meeting'} />}
                triggerWhenOpen={<TriggerElm heading={'Expert Meeting'} open={true} />}>
                {expertMeetingHistoryList && expertMeetingHistoryList.map((item, index) => (
                    <div key={`expertmeeting+${index}`} className="card-ih">
                        <div className="card-content">
                            <div className="text--left">{item.date}</div>
                            <div>{item.prodName}</div>
                            <div className="price">{item.price}</div>
                        </div>
                    </div>
                ))}
            </Collapsible>
        </PaymentHistoryDiv>
    );
};

type IProps = {
    planHistoryList: any[];
    questionHistoryList: any[];
    expertMeetingHistoryList: any[];
}