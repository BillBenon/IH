import React from 'react';
import { useSelector } from 'react-redux';
import { getValueBrowserStorage } from 'services/browserStorageService';
import { RootState } from 'store';
import styled from 'styled-components';
import { getEnrollmentType, notEmpty } from 'utilities';
import { Expert_Login, TrackEnrollType } from 'utilities/constants';

const LogoLink = styled.div`
  a {
    text-decoration: none;
  }
`;

const LogoImage = styled.img`
  width: ${(props: any) => props.imageSize || '58px'};
  height: auto;
  color: ${(props: any) => props.color || 'white'};
`;

const LogoText = styled.span`
  font-family: Merriweather;
  font-weight: ${(props: any) => props.fontWeight || 'normal'};
  line-height: 1.3;
  text-align: center;
  font-size: ${(props: any) => props.fontSize || '20px'};
  color: ${(props: any) => props.color || 'white'};
  margin-left: 10px;
`;

const PlacementPartner = styled.div`
  font-size: 12px;
  font-family: Merriweather;
  color: #315cd5;
  margin-left: -40%;
  margin-top: 40px;
`;

interface Props {
  imageSize: string;
  textSize: string;
  color: string;
  logoText: string;
  logoImage: string;
  fontWeight?: string;
  className?: string;
  href?: string;
}

export const Logo: React.FC<Props> = (props) => {
  const { currentTrack } = useSelector((state: RootState) => state.evaluationPlatform)
  const expertLogin = (getValueBrowserStorage(Expert_Login)== null)?false:true;
  const logo = (
    <>
      <div className="flexrow flex-align-center flex-justify-center">
        <LogoImage src={props.logoImage} alt={props.logoText} {...props} />
        <LogoText {...props}>{props.logoText}</LogoText>
        {getEnrollmentType() === TrackEnrollType.FORPLACEMENT && (
            <PlacementPartner>
              {currentTrack?.candidateTrack[0]?.placementPartner?.name}
            </PlacementPartner>
        )}
        {(expertLogin)?<PlacementPartner>Candidate Simulation Mode</PlacementPartner>:''}
      </div>
    </>
  );

  return notEmpty(props.href) ?
    <LogoLink><a href={props.href} target="_blank" className="logoLink">{logo}</a></LogoLink>
    : logo;
};
