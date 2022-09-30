import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import OuterDiv from '../../components/Common/OuterDivComponent'
import { OnboardingSettings } from '../../containers/Settings/OnboardingSettings'
import { useMenuVisibility } from '../../providers/menuVisibilityProvider'
import './Settings.css'
export const SettingsPage = () => {
    const { isMenuVisible } = useMenuVisibility()!;
    return (
        <OuterDiv {...{ isMaximizeContent: !isMenuVisible }}>
            <div className="ml-3">
                <Tabs defaultActiveKey="onboarding" id="uncontrolled-tab-example" className="mb-3">
                    <Tab eventKey="onboarding" title="Onboarding" className="border-top">
                        <OnboardingSettings />
                    </Tab>
                </Tabs>
            </div>
        </OuterDiv>
    )
}
