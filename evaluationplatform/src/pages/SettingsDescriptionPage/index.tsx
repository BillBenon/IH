import React, { useEffect, useState } from 'react';
import { Settings } from '@styled-icons/material/Settings';
import styled from 'styled-components';
import { Link, useRouteMatch } from 'react-router-dom';
import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { isPlacementTrack } from 'utilities/helperFunctions';

const StyledIcon = styled(Settings)`
  color: #5b94e3;
  width: 100px;
  margin-bottom: 1rem;
`;

const SettingsDescription = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    margin-top: -2rem;
    table {
        margin: 0 auto;
        border-spacing: 0 10px;
        border-collapse: separate;

        a {
            text-decoration: none;
            color: inherit;
        }

        td, th {
            border-left: 1px solid #dddddd;
            text-align: left;
            padding: 8px;
        }
    
        td:first-child {
            border: none;
        }
    }
    .disabled-link {
        pointer-events: none;
    }
`;

export const SettingsDescriptionPage = () => {
    const match = useRouteMatch();
    const currentTrack = useSelector((state: RootState) => state.evaluationPlatform.currentTrack);
    const [disableLink, setDisableLink] = useState<string>("");

    useEffect(() => {
        if(isPlacementTrack()) {
            setDisableLink("disabled-link");
        } else {
            setDisableLink("");
        }
    }, [currentTrack])

    return (
        <SettingsDescription>
            <StyledIcon />
            <table>
                <tbody>
                    <tr>
                        <td><b>{'Manage Track'}</b></td>
                        <td><Link to={`${match.path}/tracks`} className={disableLink}>{'Enroll yourself in new tracks'}</Link></td>
                        <td><Link to={`${match.path}/tracks`} className={disableLink}>{'Change your current track'}</Link></td>
                    </tr>
                    <tr>
                        <td><b>{'Plan & Payments'}</b></td>
                        <td><Link to={`${match.path}/payments`} className={disableLink}>{'See your current plan'}</Link></td>
                        <td><Link to={`${match.path}/payments`} className={disableLink}>{'Upgrade your plan'}</Link></td>
                        <td><Link to={`${match.path}/payments`} className={disableLink}>{'See your payment history'}</Link></td>
                    </tr>
                    <tr>
                        <td><b>{'Download as PDF'}</b></td>
                        <td><Link to={`${match.path}/pdf`} className={disableLink}>{'Download PDF'}</Link></td>
                    </tr>
                    <tr>
                        <td><b>{'Onboarding Videos'}</b></td>
                        <td><Link to={`${match.path}/onboarding`} className={disableLink}>{'Introduction/Track Videos'}</Link></td>
                    </tr>
                    <tr>
                        <td><b>{'Others'}</b></td>
                        <td><Link to={`${match.path}/others`} className={disableLink}>{'Coming soon...'}</Link></td>
                    </tr>
                </tbody>
            </table>
        </SettingsDescription>
    )
}