import Fields from './FIelds';
import Field from './Field';

export default interface AppData {
	id: number;
	name: string;
	description: string;
	code: string;
	icon: string;
	fields: Fields;
	defaultViewCode: string;
	created_at: string;
	updated_at: string;
	archived_at: string | null;
}