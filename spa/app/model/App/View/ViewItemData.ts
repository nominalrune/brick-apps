import { ReactNode } from 'react';
import { InputTypeOption, ReferringAppCode } from './InputTypes';
import JsValueType from '../JsValueType';
import ValueTypeOption from '../ValueTypeOption';

export default interface ViewItemData<T extends InputTypeOption = InputTypeOption, U extends ValueTypeOption = ValueTypeOption>{
    code: string;
    type: T;
    label?: string;
    prefix?: string;
    suffix?: string;
    defaultValue: JsValueType<U>|undefined;
    referringAppCode?: ReferringAppCode;
    rules?: {
        required?: boolean,
        min?: number,
        max?: number,
        pattern?: string,
        customValidator?: (value: any) => any;
        options?:([value:any]|[value: any, label: ReactNode])[]
    };
}
