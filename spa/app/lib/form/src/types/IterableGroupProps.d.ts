import AttributeBase from './AttributeBase';
import {  InputDataType } from './commonTypes';

export default interface IterableGroupProps<T extends readonly AttributeBase[]> {
	model: T,
	value: { [key in T[number]["name"]]: InputDataType<T[number]>; }[],
	onChange: (value: any) => void,
}