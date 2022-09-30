import TabsIH from 'components/Common/Tabs';
import ExpertInfo from 'components/ExpertInfo';
import { ExpertTab, MeetingProduct } from 'components/TalkToExpert/expertTabsAndPanels';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IGetExperts } from 'types/TalkToExpert';

const StyledExpertProduct = styled.div`
    .react-tabs__tab-panel {
        padding: 0.5rem 0;
        justify-content: center;
    }

    .react-tabs__tab-list {
        text-align: left;
    }
    
    .react-tabs__tab--selected {
        background-color: #dee2e6 !important;
    }
`;

const ExpertProducts = ({ experts, selectExpertHandler, products, selectedTabIndex, scheduleButtonHandler, selectedExpertId, isContractPlan, selectedExertDetail }: IProps) => {
    const [expertsTabList, setExpertsTabList] = useState<JSX.Element[]>([]);
    const [expertsTabPanels, setExpertsTabPanels] = useState<JSX.Element[]>([]);

    const getEmptyPanels = () => {
        const panels: JSX.Element[] = [];
        panels.length = experts.length;
        panels.fill(<></>);
        return panels;
    }

    useEffect(() => {
        const expertsTabs = experts?.map(t => (
            <ExpertTab name={t.fullName} badgeCount={t.totalPendingMeeting} />
        ));
        setExpertsTabList(expertsTabs);
    }, [experts]);

    useEffect(() => {
        if (expertsTabPanels) {
            const panels = getEmptyPanels();
            const expertTabIndex = experts.findIndex(x => x.expertId === selectedExpertId);
            if (expertTabIndex >= 0) {
                const expert = experts[expertTabIndex];
                const productsBoxes = products.map((p, index) => (
                    <MeetingProduct
                        key={'ep' + index}
                        prop={p}
                        btnHandler={scheduleButtonHandler}
                        btnLabel={(isContractPlan || p.meetingPaidButNotScheduled) ? 'Schedule' : 'Buy and Schedule'}
                        tag={isContractPlan ? '' : `$${(p.price / 100).toString()}/hr`}
                    />
                ))
                panels[expertTabIndex] = (
                    <>
                        {selectedExertDetail ? <ExpertInfo
                            fullname={selectedExertDetail.fullname}
                            workingAt={selectedExertDetail.workingAt}
                            profile={selectedExertDetail.profile}
                            isProfileExpanded={true}
                            email={selectedExertDetail.email}
                            expertCategory={selectedExertDetail.expertCategory}
                            customStyle={{ boxShadow: 'none', border: 'none' }}
                            photoURL={selectedExertDetail.photoURL}
                        /> : <></>}
                        <div className="row m-0">{productsBoxes}</div>
                    </>)
            }
            setExpertsTabPanels(panels);
        }
    }, [products]); // eslint-disable-line

    return (
        <StyledExpertProduct id="talktoexperts-experts">
            <TabsIH
                items={expertsTabList}
                panels={expertsTabPanels}
                onSelectHandler={(index) => selectExpertHandler(index)}
                selectedIndex={selectedTabIndex} />
        </StyledExpertProduct>
    );
}

interface IProps {
    selectExpertHandler: (e: any) => void;
    selectedTabIndex: number;
    experts: IGetExperts[];
    products: any[];
    scheduleButtonHandler: (productId: string, price: string, title: string) => void;
    selectedExpertId: string;
    isContractPlan: boolean;
    selectedExertDetail: any;
}

export default ExpertProducts;