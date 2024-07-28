import AttributeBase from './AttributeBase';
import {  InputDataType } from './commonTypes';

type GroupValue<T extends readonly AttributeBase[]> ={ [key in T[number]["name"]]: InputDataType<T[number]>; };
export default GroupValue;