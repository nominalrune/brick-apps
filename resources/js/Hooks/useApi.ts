import { get } from 'http';
import { useState, useEffect } from 'react';

function getOptions(method = "GET", signal:AbortSignal|null = null) {
    return {
        mode: "cors",
        credentials: "include",
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
        },
        method,
        signal: signal
    }as const;
};

export default function useApi() {
    const [locked, setLocked] = useState(false);
    const csrf = () => {
        const controller = new AbortController();
        fetch('/sanctum/csrf-cookie', getOptions('GET', controller.signal))
    };
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
