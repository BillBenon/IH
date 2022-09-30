const isCandidateAuthenticated = () => {
    return !!sessionStorage.getItem('candidateId');
}

const getLocalStorageValue = (key: string) => {
    return localStorage.getItem(key);
}

const getValueBrowserStorage = (key: string) => {
    return sessionStorage.getItem(key);
}

const setValueBrowserStorage = (key: string, value: string) => {
    return sessionStorage.setItem(key, value);
}

const clearBrowserStorage = (key: string) => {
    sessionStorage.removeItem(key);
}

export {
    isCandidateAuthenticated,
    clearBrowserStorage,
    getValueBrowserStorage,
    setValueBrowserStorage,
    getLocalStorageValue,
}