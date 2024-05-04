export default interface IProfile {
	user_id: number;
	name: string;
	description: string;
	avatar: string;
	created_at: Date;
	updated_at: Date;
	archived_at: Date | null;
}