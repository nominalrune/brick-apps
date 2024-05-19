import WithoutMethods from '~/model/common/WithoutMethods';
import Field from '../Field';
import JsValueType from '../JsValueType';

type RecordBase<T extends Field[] = Field[]>= {
	[key in T[number]["code"]]: JsValueType<T[number]["valueType"]>;
}
export default RecordBase;