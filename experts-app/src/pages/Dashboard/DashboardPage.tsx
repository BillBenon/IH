import { Dashboard } from "@styled-icons/boxicons-solid/Dashboard";
import React from 'react';
import OuterDiv from '../../components/Common/OuterDivComponent';
import { useMenuVisibility } from '../../providers/menuVisibilityProvider';
import { InProgressWrapper } from '../ExpertView/ExpertView';

function DashboardPage() {
    const { isMenuVisible } = useMenuVisibility()!;
    
    return (
        <OuterDiv {...{ isMaximizeContent: !isMenuVisible }}>
            <InProgressWrapper>
                <Dashboard style={{ height: '100px' }} />
                {"Coming soon..."}
            </InProgressWrapper>
        </OuterDiv>
    );
}

export { DashboardPage };
