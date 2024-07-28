import AttributeBase from './AttributeBase';

export default interface BaseGroupProps<T extends readonly AttributeBase[], U> {
	model: T,
	value: U,
	onChange: (value: U) => void,
}