import AppData from './AppData';
import Record from './Record/Record';
import View from './View/View';
import ViewData from './View/ViewData';
export default interface AppDataWithViewAndRecords extends AppData {
	view: ViewData;
	records: Record[];
}