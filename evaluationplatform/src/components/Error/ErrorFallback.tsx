import React, { Component } from 'react';
import { logClientErrors } from 'store/evaluationPlatform';

export default function ErrorFallback({ error, resetErrorBoundary }: any) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button onClick={resetErrorBoundary}>Try again</button>
        </div>
    )
}


export function errorHandler(error: Error, info: {componentStack: string}){
    logClientErrors({ errorMessage: error?.message, remarks: 'Component Error', stackTrace: info.componentStack })
}