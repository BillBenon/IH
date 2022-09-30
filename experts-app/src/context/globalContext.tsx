// import { GlobalLoader } from './loaderDots';
import React from 'react';
import { GlobalLoader } from './loaderContext';
import { MessagePopup } from './messagePopContext';

export const GlobalContext = ({ children }: IProps) => {
    return (
        <GlobalLoader>
            <MessagePopup>
                {children}
            </MessagePopup>
        </GlobalLoader>
    );
};

type IProps = {
    children: React.ReactNode;
}