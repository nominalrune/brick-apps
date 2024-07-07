import AppData from './AppData';
import Record from './Record/Record';
import View from './View/View';
export default interface AppDataWithViewAndRecords extends AppData {
	view: View;
	records: Record[];
}