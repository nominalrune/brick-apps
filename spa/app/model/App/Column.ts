import ValueTypeOption from './ValueTypeOption';

export default interface Column {
	code: string,
	valueType: ValueTypeOption,
	option?: unknown,
}
