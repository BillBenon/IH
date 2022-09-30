import ButtonsBar from 'components/ButtonsBar/ButtonsBar';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ToolsDashBoard } from 'utils/constants';
import MailStatus from './mailStatus/mailStatus';
import MailTool from './createMail/mailTool';

const StyledToolsContainer = styled.div`
  padding-top: 0px;
  padding-left: ${(props: { theme: { isMaximizeContent: any; }; }) => props.theme.isMaximizeContent ? '0px' : '78px'};
  transition: 1s;
  margin-top: 20px;
  .frame {
    background: transparent;
    border: 1px solid #ccc;;
    height: 80vh;
    width: 100%;
  }
`;

const ToolsDashboard = () => {

    const defaultSelected = ToolsDashBoard.EMAIL_STATUS;
    const [selectedPage, setSelectedPage] = useState<ToolsDashBoard>(defaultSelected);

    return (
        <StyledToolsContainer theme={{ isMaximizeContent: true }}>
            <ButtonsBar handleClick={setSelectedPage} selectedPage={selectedPage} />
            <div className='frame'>
                {selectedPage === ToolsDashBoard.CREATE_EMAIL && <MailTool></MailTool>}
                {selectedPage === ToolsDashBoard.EMAIL_STATUS && <MailStatus></MailStatus>}
            </div>
        </StyledToolsContainer >
    )
}

export default ToolsDashboard