import { ReactNode } from 'react';
import ViewItemData from './ViewItemData';
import { InputTypeOption, } from './InputTypes';
import JsValueType from '../JsValueType';
import ValueTypeOption from '../ValueTypeOption';
export default class ViewItem<T extends InputTypeOption = InputTypeOption, U extends ValueTypeOption = ValueTypeOption> {
	private _error = "";
	get error() { return this._error; }
	public defaultValue: JsValueType<U> | undefined;
	public readonly referringAppCode?: string;
	constructor(
		public readonly type: T,
		public readonly code: string,
		defaultValue?: JsValueType<U>,
		public readonly label = "",
		public readonly prefix = "",
		public readonly suffix = "",
		public readonly rules: {
			required?: boolean,
			min?: number,
			max?: number,
			pattern?: string,
			customValidator?: (value: string) => { validity: boolean, errorMessage: string; };
			options?: ([value: any] | [value: any, label: ReactNode])[];
		} = {},
		referringAppCode?: string,
	) {
		this.defaultValue = defaultValue;
		if (this.type === "reference") {
			this.referringAppCode = referringAppCode;
		}
	}
	updateValue(value: JsValueType<U>) {
		return new ViewItem(this.type, this.code, value, this.label, this.prefix, this.suffix, this.rules, this.referringAppCode);
	}
	update(key: keyof ViewItem, value: unknown) {
		return ViewItem.fromData({ ...this.toJSON(), [key]: value });
	}
	clone() {
		return new ViewItem(this.type, this.code, this.defaultValue, this.label, this.prefix, this.suffix, this.rules, this.referringAppCode);
	}
	toJSON(): ViewItemData<T, U> {
		return {
			type: this.type,
			code: this.code,
			defaultValue: this.defaultValue,
			label: this.label,
			prefix: this.prefix,
			suffix: this.suffix,
			rules: this.rules,
			referringAppCode: this.referringAppCode,
		};
	}
	static fromData(data: ViewItemData) {
		return new ViewItem(data.type, data.code, data.defaultValue, data.label, data.prefix, data.suffix, data.rules, data.referringAppCode);
	}
	// toJSON() {
	//     return JSON.stringify(this.toDTO());
	// }
}
