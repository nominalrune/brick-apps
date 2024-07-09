import AppInput from '@/Models/App/AppInput';

export default class CreateAppService {
    constructor() { }
    private async _createApp(url: string, code: string, name: string, description: string, form: AppInput[][]) {
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "same-origin",
            body: JSON.stringify({
                code,
                name,
                description,
                form,
            })
        });
        return await result.json();
    }
    public async createAppDry(code: string, name: string, description: string, form: AppInput[][]) {
        return await this._createApp('/app/create/dry', code, name, description, form);
    }
    public async createApp(code: string, name: string, description: string, form: AppInput[][]) {
        return await this._createApp('/app/create', code, name, description, form);
    }
}
