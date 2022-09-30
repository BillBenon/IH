import React, { useState } from 'react';
import { OverlayLoader } from '../components/Common/Loader/loaderWithOverlay';


type LoaderContextType = {
    showLoader: (disableOverlay?: boolean) => void;
    hideLoader: () => void;
}

const LoaderContext = React.createContext<LoaderContextType>({
    showLoader: (disableOverlay?: boolean) => { },
    hideLoader: () => { }
});

type LoaderProp = {
    children: React.ReactNode;
}

export const GlobalLoader = ({ children }: LoaderProp) => {
    const [loading, setLoading] = useState(false);
    const [noOverlay, setNoOverlay] = useState(false);

    const startLoading = (disableOverlay?: boolean) => {
        setNoOverlay(!!disableOverlay);
        setLoading(true);
    }
    
    const stopLoading = () => {
        setNoOverlay(false);
        setLoading(false);
    }

    return (
        <LoaderContext.Provider value={{ showLoader: startLoading, hideLoader: stopLoading }}>
            <OverlayLoader loading={loading} disableOverlay={noOverlay} />
            {children}
        </LoaderContext.Provider>
    )
}

export const useLoader = () => React.useContext(LoaderContext);