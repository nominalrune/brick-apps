import Column from './Column';

export default interface AppData {
	name: string;
	description: string;
	code: string;
	icon: string;
	columns: Column[];
	default_view: string;
	archived_at: string | null;
}