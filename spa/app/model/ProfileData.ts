export default interface ProfileData {
	user_id?: number;
	name: string;
	description: string;
	avatar: string;
	created_at: string;
	updated_at: string;
	archived_at: string | null;
}
