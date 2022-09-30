import { MainHeader, Sidebar } from 'containers';
import { ClassesContainer } from 'containers/ClassesContainer';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledClassesPage = styled.div`
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
}
`;

export const Classes: React.FC<any> = (props) => {
    let [isMaximizeContent, setMaximizeContent] = useState(false);


    const handleMaximizeContent = () => {
        setMaximizeContent(!isMaximizeContent);
    };

    return (
        <StyledClassesPage>
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
                <ClassesContainer isMaximizeContent={isMaximizeContent} />
            </div>
        </StyledClassesPage>
    )
}
