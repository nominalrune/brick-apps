import Column from '../Column';
import RecordBase from './RecordBase';

type Record<T extends Column[] = Column[]> = RecordBase<T> & {
	id: number|undefined;
}
export default  Record;