import IAppInput from './IAppInput';
import { InputTypeInJS, InputTypeOption, InputValueTypeOption } from './InputTypes';

export default class AppInput<T extends InputTypeOption=InputTypeOption, U extends InputValueTypeOption=InputValueTypeOption> implements IAppInput<T, U> {
    private _error = '';
    public defaultValue: InputTypeInJS<U> | undefined;
    public readonly referringAppCode?: string;
    get error() { return this._error; };
    constructor(
        public readonly type: T,
        public readonly code: string,
        public readonly valueType: U,
        defaultValue?: InputTypeInJS<U>,
        public readonly label = "",
        public readonly prefix = "",
        public readonly suffix = "",
        public readonly rules: { [key: string]: string; } = {},
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
    update(key: "type" | "code" | "valueType" | "defaultValue" | "label" | "rules" | "prefix" | "suffix" | "referringAppCode", value: any) {
        return AppInput.fromDTO({ ...this.toDTO(), [key]: value });
    }
    set error(msg: string) {
        this._error = msg;
    }
    clone() {
        return new AppInput(this.type, this.code, this.valueType, this.defaultValue, this.label, this.prefix, this.suffix, this.rules, this.referringAppCode);
    }
    toDTO() {
        return {
            type: this.type,
            code: this.code,
            valueType: this.valueType,
            defaultValue: this.defaultValue,
            label: this.label,
            prefix: this.prefix,
            suffix: this.suffix,
            rules: this.rules,
            referringAppName: this.referringAppCode,
        };
    }
    static fromDTO(dto: any) {
        return new AppInput(dto.type, dto.code, dto.valueType, dto.defaultValue, dto.label, dto.prefix, dto.suffix, dto.rules, dto.referringAppName);
    }
    toJSON() {
        return JSON.stringify(this.toDTO());
    }
}
