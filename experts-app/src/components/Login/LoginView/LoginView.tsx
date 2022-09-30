import React from 'react';

import { LoginContainer } from '../../Common/Controls/LoginContainer';
import { LoginForm } from '../LoginForm';

type IProps = {
    handleLogin: Function;
}

export const LoginView: React.FC<IProps> = (props: IProps) => {
    return (
        <LoginContainer>
            <LoginForm {...props}></LoginForm>
        </LoginContainer>
    )
}
