import { InputTypeInJS, InputTypeOption, InputValueTypeOption, ReferringAppName } from './types';

export default interface IAppInput<T extends InputTypeOption = "text", U extends InputValueTypeOption = "varchar"> {
    code: string;
    type: T;
    valueType: U;
    label: string;
    prefix: string;
    suffix: string;
    defaultValue: InputTypeInJS<U>;
    referringAppName?: ReferringAppName;
    rules: {
        required?: boolean,
        min?: number,
        max?: number,
        pattern?: string,
        customValidator?: (value: any) => any;
    };
}
