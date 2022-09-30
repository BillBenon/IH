import React from 'react';
import OuterDiv from '../../components/Common/OuterDivComponent';
import { useMenuVisibility } from '../../providers/menuVisibilityProvider';
import { InProgressWrapper } from '../ExpertView/ExpertView';
import { Youtube } from "@styled-icons/boxicons-logos/Youtube";


function VideosPage() {
    const { isMenuVisible } = useMenuVisibility()!;
    return (
        <OuterDiv {...{ isMaximizeContent: !isMenuVisible }}>
            <InProgressWrapper>
                <Youtube style={{ height: '100px' }} />
                {"Coming soon..."}
            </InProgressWrapper>
        </OuterDiv>
    );
}

export { VideosPage };