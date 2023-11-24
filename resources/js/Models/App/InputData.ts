import IAppInput from './AppInput';
import { InputTypeInJS, InputTypeOption, InputValueTypeOption } from './types';

export default class AppInput<T extends InputTypeOption = "text", U extends InputValueTypeOption = "varchar"> implements IAppInput<T,U> {
    private _error = '';
    public defaultValue: InputTypeInJS<U>;
    public readonly referringAppName?: string;
    get error() { return this._error; };
    constructor(
        public readonly type: T,
        public readonly code: string,
        public readonly valueType: U = "varchar",
        defaultValue?: string,
        public readonly label = "",
        public readonly prefix = "",
        public readonly suffix = "",
        public readonly rules: { [key: string]: string; } = {},
        referringAppName?: string,
    ) {
        if (this.type === "color") {
            this.defaultValue = defaultValue || "#000000";
        } else {
            this.defaultValue = defaultValue || "";
        }
        if (this.type === "reference") {
            this.referringAppName = referringAppName;
        }
    }
    updateValue(value: string) {
        return new AppInput(this.type, this.code, this.valueType, value, this.label, this.prefix, this.suffix, this.rules, this.referringAppName);
    }
    update(key: "type" | "code" | "valueType" | "defaultValue" | "label" | "rules" | "prefix" | "suffix" | "referringAppName", value: any) {
        return AppInput.fromDTO({ ...this.toDTO(), [key]: value });
    }
    set error(msg: string) {
        this._error = msg;
    }
    clone() {
        return new AppInput(this.type, this.code, this.valueType, this.defaultValue, this.label, this.prefix, this.suffix, this.rules, this.referringAppName);
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
            referringAppName: this.referringAppName,
        };
    }
    static fromDTO(dto: any) {
        return new AppInput(dto.type, dto.code, dto.valueType, dto.defaultValue, dto.label, dto.prefix, dto.suffix, dto.rules, dto.referringAppName);
    }
}
