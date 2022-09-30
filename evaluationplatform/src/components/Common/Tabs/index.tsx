import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { notEmpty } from 'utilities';
import { VideoPlayer } from 'components/VideoPlayer';

const Main = styled.div`
    .react-tabs{
        width: 100% !important
    }
    .react-tabs__tab:hover{
        background-color: rgba(245,248,250,.8);
        color: #009ef7 !important;
    }
    .react-tabs__tab--selected{
        background-color: rgba(245,248,250,.8);
        border-radius: .475rem;
        border:0;
        color: #009ef7 !important;
    }
    .react-tabs__tab{
        border:0;
        color: #5e6278;
        font-weight: 500 !import;
        margin: 5px;
    }
    .react-tabs__tab-list{
        border-bottom: 0;
        text-align: center;
    }
`

const TabsIH = ({ items, panels, onSelectHandler, selectedIndex }: PropsType) => {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    useEffect(() => {
        selectedIndex && setSelectedTabIndex(selectedIndex);
    }, [selectedIndex])

    return (
        <Main>
            {notEmpty(items) && notEmpty(panels) && items.length == panels.length &&
                <Tabs
                    onSelect={(index) => { onSelectHandler(index); setSelectedTabIndex(index) }}
                    selectedIndex={selectedTabIndex}>
                    <TabList>
                        {items.map((item, index) => (
                            <Tab key={index}>{item}</Tab>
                        ))}
                    </TabList>
                    {panels.map((panel, index) => (
                        <TabPanel key={index}>{panel}</TabPanel>
                    ))}
                </Tabs>
            }
        </Main>
    )
}

type PropsType = {
    selectedIndex?: number;
    onSelectHandler: (index: number) => void;
    items: any[];
    panels: any[];
}

export default TabsIH;