import AppDetailsLayout from '../../../app/model/App/AppDetailsLayout';
import Widget from '../../../app/model/App/View/Widget';

export default class App {
    constructor(
        public readonly id: number | undefined,
        public readonly code: string,
        public readonly name: string,
        public readonly description: string,
        public readonly icon: string,
        public readonly form: AppDetailsLayout,
    ) { }
    public static fromDTO(data: AppData) {
        const form = new AppDetailsLayout(data.form);
        return new App(data.id, data.code, data.name, data.description, data.icon, form);
    }
    toDTO():AppData {
        const id = Number.isFinite(this.id) ? { id: this.id } : {};
        return {
            ...id,
            code: this.code,
            name: this.name,
            description: this.description,
            icon: this.icon,
            form: this.form.content,
            form_keys: this.form.formKeys
        };
    }
}
export interface AppData {
    id?: number;
    code: string;
    name: string;
    icon: string;
    description: string;
    form_keys: string[];
    form: Widget[][];
}
