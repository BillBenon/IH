export const getFolderPathAfterDomainName = (url: string) => {
    if (!url) return url;
    if (!url.includes(".com/")) {
        return decodeURIComponent(url);
    }
    return remUnWanTxtHelper(url.split(".com/")[1]);
}

export const remUnWanTxtHelper = (name: string) => {
    let index = name.indexOf("?");
    return decodeURIComponent(name.substring(0, index == -1 ? name.length : index));
}

export const convertHttpsToHttpFromUrl = (url: string) => {
    if (url == null) return url;
    return "http" + url.substring(url.indexOf(':'), url.length);
}

export const downloadFile = (folderPath: string) => {
    const link = document.createElement('a');
    link.href = folderPath;
    link.setAttribute('download', '');
    document.body.appendChild(link);
    link.click();
}

// build url with parameters
export const buildUrlWithParams = (url: string, params: any = {}) => {
    let queryString = "";
    for (let key in params) {
        queryString += key + "=" + params[key] + "&";
    }
    return url + "?" + queryString;
}