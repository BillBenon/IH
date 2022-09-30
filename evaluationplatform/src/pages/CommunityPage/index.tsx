import { MainHeader, Sidebar } from 'containers';
import { CommunityContainer } from 'containers/CommunityContainer';
import React, { useState } from 'react';
import styled from 'styled-components';

const StyledCommunityPage = styled.div`
.content {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .header {
    z-index: 100;
    position: fixed;
    width: 100%;
  }
`;

export const DiscoursePage: React.FC<any> = (props) => {
    let [isMaximizeContent, setMaximizeContent] = useState(false);

    const handleMaximizeContent = () => {
        setMaximizeContent(!isMaximizeContent);
    };

    return (
        <StyledCommunityPage>
            <Sidebar isMaximizeContent={isMaximizeContent} />
            <div className='content'>
                <div className="header">
                    <MainHeader
                        color="#315cd5"
                        isMaximizeContent={isMaximizeContent}
                        handleMaximizeContent={handleMaximizeContent}
                        disable={!!props?.location?.state?.disable}
                    />
                </div>
                <CommunityContainer isMaximizeContent={isMaximizeContent} />
            </div>
        </StyledCommunityPage>
    );
};

export default DiscoursePage;
