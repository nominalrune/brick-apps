import { ReactNode } from 'react';
import AppInputData from './AppInputData';
import { InputTypeInJS, InputTypeOption, InputValueTypeOption } from './InputTypes';

export default class AppInput<T extends InputTypeOption=InputTypeOption, U extends InputValueTypeOption=InputValueTypeOption> implements AppInput<T, U> {
    private _error="";
    get error(){return this._error;}
    public defaultValue: InputTypeInJS<U> | undefined;
    public readonly referringAppCode?: string;
    constructor(
        public readonly type: T,
        public readonly code: string,
        public readonly valueType: U,
        defaultValue?: InputTypeInJS<U>,
        public readonly label = "",
        public readonly prefix = "",
        public readonly suffix = "",
        public readonly rules:{
            required?: boolean,
            min?: number,
            max?: number,
            pattern?: string,
            customValidator?: (value: string) => { validity: boolean, errorMessage: string; };
            options?: ([value:any]|[value: any, label: ReactNode])[]
        }={},
        referringAppCode?: string,
    ) {
        this.defaultValue = defaultValue;
        if (this.type === "reference") {
            this.referringAppCode = referringAppCode;
        }
    }
    updateValue(value: InputTypeInJS<U>) {
        return new AppInput(this.type, this.code, this.valueType, value, this.label, this.prefix, this.suffix, this.rules, this.referringAppCode);
    }
    update(key:keyof AppInput, value: unknown) {
        return AppInput.fromDTO({ ...this.toDTO(), [key]: value });
    }
    clone() {
        return new AppInput(this.type, this.code, this.valueType, this.defaultValue, this.label, this.prefix, this.suffix, this.rules, this.referringAppCode);
    }
    toDTO():AppInputData {
        return {
            type: this.type,
            code: this.code,
            valueType: this.valueType,
            defaultValue: this.defaultValue,
            label: this.label,
            prefix: this.prefix,
            suffix: this.suffix,
            rules: this.rules,
            referringAppCode: this.referringAppCode,
        };
    }
    static fromDTO(dto: AppInputData) {
        return new AppInput(dto.type, dto.code, dto.valueType, dto.defaultValue, dto.label, dto.prefix, dto.suffix, dto.rules, dto.referringAppCode);
    }
    // toJSON() {
    //     return JSON.stringify(this.toDTO());
    // }
}
