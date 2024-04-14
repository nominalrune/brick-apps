import Client from './Client';

export default function useApi(options: RequestInit = defaultOptions) {
    const controller = new AbortController();
    let locked = false;
    const api = async (url: string, options: RequestInit = {}) => {
        const response = await fetch(url, { ...defaultOptions, ...options, signal: controller.signal });
        if (response.ok) {
            return response;
        }
        const error = new Error(response.statusText);
        error.response = response;
        throw error;
    };
    const csrf = () => api.get('/sanctum/csrf-cookie');
    api.interceptors.request.use(async function (request) {
        if (locked) {
            return Promise.reject('Locked');
        }
        locked = true;
        return request;
    });
    api.interceptors.response.use(
        (response: AxiosResponse) => {
            locked = false;
            return response;
        },
        (error) => {
            locked = false;
            return Promise.reject(error);
        }
    );
    return { api, csrf, abort: () => controller.abort() };
}
