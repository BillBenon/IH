import { AxiosInstance } from "axios";
import BrowserStorage from "utils/broswer-storage";

export function addAuthHeader(http: AxiosInstance): AxiosInstance {
    http.interceptors.request.use(async (req) => {
        const auth: any = await BrowserStorage.getItem("expertadmin");
        return {
            ...req,
            headers: {
                ...req.headers,
                authorization: auth ? `Bearer ${auth?.authorizationToken}` : undefined,
            },
        }
    });
    return http;
}