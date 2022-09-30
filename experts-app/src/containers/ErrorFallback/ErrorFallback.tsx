import React, { useEffect } from 'react';
import { useHistory } from 'react-router';

import { logError } from '../../utilities/api';

export const ErrorFallback = ({ error, resetErrorBoundary }: any) => {
    const history = useHistory();

    useEffect(() => {
        logError(error);
    }, [error])

    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={() => history.push('/submissions')}>Try again</button>
        </div>
    )
}
