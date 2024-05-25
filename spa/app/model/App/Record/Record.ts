import Field from '../Field';
import RecordBase from './RecordBase';

type Record<T extends Field[] = Field[]> = RecordBase<T> & {
	id: number;
}
export default  Record;