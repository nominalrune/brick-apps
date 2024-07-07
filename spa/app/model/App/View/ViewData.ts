import ViewItemData from './ViewItemData';

export default interface ViewData {
	id: number;
	code: string;
	app_code: string;
	name: string;
	description: string;
	list: { listType: string, content: unknown[]; };
	detail: ViewItemData[][];
	created_at: string;
	updated_at: string;
	archived_at: string | null;
}