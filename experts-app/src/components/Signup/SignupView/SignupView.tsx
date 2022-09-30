import React from 'react';
import { useHistory } from 'react-router';
import { SignupHeader } from 'components/SignupHeader';
import { LoginContainer } from '../../Common/Controls/LoginContainer';
import { SignupForm } from '../SignupForm';

type IProps = {
    handleSignup: (payload: any) => void;
}

export const SignupView: React.FC<IProps> = (props: IProps) => {
    const history = useHistory();
    return (
        <LoginContainer>
            <SignupHeader background="#315CD5" color="white" handleClick={() => { history.push('/login')}} />
            <SignupForm {...props}></SignupForm>
        </LoginContainer>
    )
}
