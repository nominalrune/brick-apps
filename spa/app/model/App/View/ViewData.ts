import ViewItemData from './ViewItemData';

export default interface ViewData {
	id: number;
	code: string;
	app_code: string;
	name: string;
	description: string;
	list: { listType: string, content: unknown[]; };
	detail: ViewItemData[][];
	archived_at: string | null;
}