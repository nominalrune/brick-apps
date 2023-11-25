import IAppInput from './IAppInput';

export default class App {
    constructor(
        public readonly id: number,
        public readonly code: string,
        public readonly name: string,
        public readonly description: string,
        public readonly icon: string,
        public readonly form: IAppInput[][],
        public readonly formKeys: string[],
    ) { }// TODO 足りない項目を足す

}
export interface AppData {
    id: number;
    code: string;
    name: string;
    icon: string;
    description: string;
    form_keys:string[];
    form: IAppInput[][];
}
