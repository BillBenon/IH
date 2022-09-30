import { B2B_Routes } from "./constants";

export const getUUIDFromURL = (path: string) => {
    return path.substring(path.lastIndexOf('/') + 1);
}

export const isB2bRoute = (path: string) => {
    return B2B_Routes.includes(path);
}