import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { WhiteInterviewHelpLogoIcon } from '../../assets';
import { Logo, Button } from '../../components';
import { getValidMarket } from '../../utilities';
import styled from 'styled-components';

const StyledLoginButton = styled(Button)`
  width: 129px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 2px solid white;
  font-weight: bold;
  line-height: 24px;
  text-align: center;
  padding: 0px;
`;

const StyledHeader = styled.div`
  position: fixed;
  width: -webkit-fill-available;
  background: ${(props: any) => props.background || 'white'};
  height: 57px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: 25px;
  padding-right: 34px;
  * {
    background: ${(props: any) => props.background || 'white'};
    color: ${(props: any) => props.color || 'black'};
  }
`;

interface Props {
  children?: any;
  background?: string;
  color?: string;
  market?: any;
}

const _SignupHeader: React.FC<Props> = (props) => {
  const market = getValidMarket(props.market, { name: 'InterviewHelp', logo: WhiteInterviewHelpLogoIcon, theme: '' });
  return (
    <StyledHeader {...props}>
      <Logo
        logoImage={market.logo}
        imageSize="35px"
        logoText={market.name}
        fontWeight="bold"
        textSize="20px"
        color={props.color || 'white'}
        href={'https://www.interviewhelp.io/'}
      />
      <Link to="/" style={{ textDecoration: 'none' }}>
        <StyledLoginButton>Sign in</StyledLoginButton>
      </Link>
    </StyledHeader>
  );
};

const mapStateToProps = (state: any) => ({
  market: state.evaluationPlatform.market,
});

export const SignupHeader = connect(mapStateToProps, null)(_SignupHeader);
