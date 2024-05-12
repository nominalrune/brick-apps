import Field from './Field';

export default interface AppData {
	id: number;
	name: string;
	description: string;
	code: string;
	icon: string;
	fields: Field[];
	defaultViewCode: string;
	created_at: string;
	updated_at: string;
	archived_at: string | null;
}