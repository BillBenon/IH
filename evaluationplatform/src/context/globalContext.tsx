import { ThemeProvider } from 'styled-components';
import { GlobalLoader } from './loaderDots';
import React from 'react';
import { MessagePopup } from './messagePopup';

const COLORS = {
    text: 'black',
    background: 'white',
    primary: '#5b94e3',
    secondary: '#6c757d',
    red: '#e25252'
};

export const GlobalContext = ({ children }: IProps) => {
    return (
        <ThemeProvider theme={{ colors: COLORS }}>
            <GlobalLoader>
                <MessagePopup>
                    {children}
                </MessagePopup>
            </GlobalLoader>
        </ThemeProvider>
    );
};

type IProps = {
    children: React.ReactNode;
}