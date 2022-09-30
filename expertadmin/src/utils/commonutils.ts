import { Expert } from "types";

export const getCurrentPathWithoutLastPart = (location: any) => {
  const pathRgx = /\//g;
  const childroutecount = ((location.pathname || '').match(pathRgx) || [])
    .length;
  return childroutecount > 1
    ? location.pathname.slice(0, location.pathname.lastIndexOf('/'))
    : location.pathname;
};

export const getCurrentPath = (location: any) => {
  const arr = location.pathname.split('/');
  if (arr.length) {
    return arr[arr.length - 1];
  }
  return '';
};

export const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export const reorderByRef = (
  list: any[],
  startIndex: number,
  endIndex: number
) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
};

export const isNumeric = (str: string | undefined) => {
  if (!str) return false;
  return !isNaN(Number(str));
};

export const maskStringByHyphen = (str: string) => {
  str = str.slice(-7);
  const middle = Math.floor(str.length / 2);
  const s1 = str.substr(0, middle);
  const s2 = str.substr(middle + 1);
  return s1 + '-' + s2;
};

export const validURL = (str: string) => {
  const pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$',
    'i'
  ); // fragment locator
  return !!pattern.test(str);
};

export const trimContent = (str: string) => {
  return str.trim();
};

export const isSuperAdmin = (expert: Expert) => {
  return expert?.roleType === 'SUPER_ADMIN';
}

export const isMarketingExpert = (expert: Expert) => {
  return expert?.roleType === 'MARKETING';
}

export const isExpertAdmin = (expert: Expert) => {
  return expert?.roleType === 'EXPERT_ADMIN';
}

export const buildUrlWithParams = (url: string, params: any = {}) => {
  let query = '';
  Object.keys(params).forEach((key) => {
    query += `${key}=${params[key]}&`;
  }
  );
  return `${url}?${query}`;
}

export const getFileNameFromURL = (url: string) => {
  if (url) {
    const tempArr = url.split(".");
    let ext;
    if (tempArr[tempArr.length - 1].length) {
      ext = tempArr[tempArr.length - 1];
    }
    const m = url.toString().match(/.*\/(.+?)\./);
    if (m && m.length > 1) {
      return m[1] + "." + ext;
    }
  }
  return "";
}

export const removeUnwantedTextFromFileName = (url: string) => {
  const name = getFileNameFromURL(url);
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
  const index = name?.indexOf("?");
  return decodeURIComponent(name?.substring(0, index == -1 ? name.length : index));
}