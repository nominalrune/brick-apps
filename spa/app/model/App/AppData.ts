import Columns from './Columns';
import Column from './Column';
import Widget from './View/Widget';

export default interface AppData {
	id: number;
	name: string;
	description: string;
	code: string;
	icon: string;
	columns: Columns;
	defaultViewCode: string;
	created_at: string;
	updated_at: string;
	archived_at: string | null;
}