export function extractParams(params: any) {
  if (params[0] === '?') params = params.slice(1)

  return params
    .split('&')
    .reduce((acc: any, curr: any) => {
      const param = curr.split('=');
      return { [param[0]]: param[1], ...acc }
    }, {})
}

export const getUUIDFromURL = (path: string) => {
  return path.substring(path.lastIndexOf('/') + 1);
}

export const getFileNameFromURL = (url: string) => {
  if (url) {
    const tempArr = url.split(".");
    let ext;
    if (tempArr[tempArr.length - 1].length) {
      ext = tempArr[tempArr.length - 1];
    }
    var m = url.toString().match(/.*\/(.+?)\./);
    if (m && m.length > 1) {
      return m[1] + "." + ext;
    }
  }
  return "";
}

export const removeUnwantedTextFromFileName = (url: string) => {
  let name = getFileNameFromURL(url);
  return remUnWanTxtHelper(name);
}

export const getFolderPathAfterDomainName = (url: string) => {
  if (!url) return url;
  if (!url.includes(".com/")) {
    return decodeURIComponent(url);
  }
  return remUnWanTxtHelper(url?.split(".com/")[1]);
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

const remUnWanTxtHelper = (name: string) => {
  let index = name?.indexOf("?");
  return decodeURIComponent(name?.substring(0, index == -1 ? name.length : index));
}