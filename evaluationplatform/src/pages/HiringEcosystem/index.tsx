import { MainHeader, Sidebar } from 'containers';
import { HiringEcosystemContainer } from 'containers/HiringEcosystemContainer';
import { useLoader } from 'context/loaderDots';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledHiringEcosystemPage = styled.div`
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

export const HiringEcosystem: React.FC<any> = (props) => {
    let [isMaximizeContent, setMaximizeContent] = useState(false);

    const loader = useLoader();

    const handleMaximizeContent = () => {
        setMaximizeContent(!isMaximizeContent);
    };

    useEffect(() => {
        loader.showLoader();
        setTimeout(() => {
            loader.hideLoader();
        }, 4000);
    }, [])



    return (
        <StyledHiringEcosystemPage>
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
                <HiringEcosystemContainer isMaximizeContent={isMaximizeContent} history={props.history} />
            </div>
        </StyledHiringEcosystemPage>
    )
}
