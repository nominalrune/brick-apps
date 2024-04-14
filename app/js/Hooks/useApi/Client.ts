// https://laravel.com/docs/10.x/sanctum#issuing-api-tokens

export default class Client {
    private defaultOptions: RequestInit = {
        cache: 'no-cache',
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/json',
        },
        keepalive: true,
        mode: 'same-origin',
        redirect: 'error',
        referrerPolicy: 'strict-origin-when-cross-origin',
        signal: null,
    };
    get(url: string, options: RequestInit = {}) {
        return fetch(url, { ...this.defaultOptions, ...options, method: 'GET' });
    }
    post(url: string, data: any, options: RequestInit = {}) {
        return fetch(url, { ...this.defaultOptions, ...options, method: 'POST', body: JSON.stringify(data) });
    }
    put(url: string, data: any, options: RequestInit = {}) {
        return fetch(url, { ...this.defaultOptions, ...options, method: 'PUT', body: JSON.stringify(data) });
    }
    delete(url: string, options: RequestInit = {}) {
        return fetch(url, { ...this.defaultOptions, ...options, method: 'DELETE' });
    }
}
