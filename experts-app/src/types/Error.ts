export type ErrorContainer = {
    token: string;
    userId?: string | undefined;
    applicationType: string;
    errorType: string;
    errorMessage?: string;
    stackTrace?: string;
    remarks?: string;
    browserInfo?: string;
    ipAddress?: string;
}

export type Error = {
    message: string;
    stack: string;
    name: string;
}