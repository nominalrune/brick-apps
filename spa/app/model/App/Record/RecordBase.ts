import WithoutMethods from '~/model/common/WithoutMethods';
import Column from '../Column';
import JsValueType from '../JsValueType';

type RecordBase<T extends Column[] = Column[]>= {
	[key in T[number]["code"]]: JsValueType<T[number]["valueType"]>;
}
export default RecordBase;