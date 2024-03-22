import { ReactNode } from 'react';
import { InputTypeInJS, InputTypeOption, InputValueTypeOption, ReferringAppCode } from './InputTypes';

export default interface AppInputData<T extends InputTypeOption = InputTypeOption, U extends InputValueTypeOption = InputValueTypeOption>{
    code: string;
    type: T;
    valueType: U;
    label: string;
    prefix: string;
    suffix: string;
    defaultValue: InputTypeInJS<U>|undefined;
    referringAppCode?: ReferringAppCode;
    rules: {
        required?: boolean,
        min?: number,
        max?: number,
        pattern?: string,
        customValidator?: (value: any) => any;
        options?:([value:any]|[value: any, label: ReactNode])[]
    };
}
