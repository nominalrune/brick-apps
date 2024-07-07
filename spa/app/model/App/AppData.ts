import Columns from './Columns';

export default interface AppData {
	name: string;
	description: string;
	code: string;
	icon: string;
	columns: Columns;
	default_view: string;
	archived_at: string | null;
}