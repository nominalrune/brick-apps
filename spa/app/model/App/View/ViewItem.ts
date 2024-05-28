// import { ViewItemData } from '~/model/App/View/ViewItemData';
import { ReactNode } from 'react';
import ViewItemData from './ViewItemData';
import { InputTypeOption, } from './InputTypes';
import JsValueType from '../JsValueType';
import ValueTypeOption from '../ValueTypeOption';
import WithoutMethods from '~/model/common/WithoutMethods';
export default class ViewItem<U extends any=any> implements ViewItemData<U>{
	private _error = "";
	get error() { return this._error; }
	public defaultValue: U | undefined;
	public readonly referringAppCode?: string;
	public readonly type: InputTypeOption;
	public readonly code: string;
	public readonly label: string|undefined;
	public readonly prefix: string|undefined;
	public readonly suffix: string|undefined;
	public readonly rules: {
		required?: boolean,
		min?: number,
		max?: number,
		pattern?: string,
		customValidator?: (value: string) => { validity: boolean, errorMessage: string; };
		options?: ([value: any] | [value: any, label: ReactNode])[];
	}|undefined;
	constructor(data: ViewItemData<U>) {
		this.type = data.type;
		this.code = data.code;
		this.label = data.label;
		this.prefix = data.prefix;
		this.suffix = data.suffix;
		this.rules = data.rules;

		this.defaultValue = data.defaultValue;
		if (this.type === "reference") {
			this.referringAppCode = data.referringAppCode;
		}
	}
	withValue(value: U) {
		return new ViewItem({ ...this, defaultValue: value });
	}
	with(key: keyof ViewItem, value: unknown) {
		return new ViewItem({ ...this, [key]: value });
	}
	clone() {
		return new ViewItem(this);
	}
	toJSON(): ViewItemData<U> {
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
		return new ViewItem(data);
	}
	static blank() {
		return new ViewItem({ code: "", type: "text", defaultValue: "" });
	}
	// toJSON() {
	//     return JSON.stringify(this.toDTO());
	// }
}
