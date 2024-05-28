import ValueTypeOption from './ValueTypeOption';

export default interface Field {
	code: string,
	valueType: ValueTypeOption,
	option?: unknown,
}
