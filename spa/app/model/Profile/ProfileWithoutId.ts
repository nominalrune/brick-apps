import WithoutMethods from '../common/WithoutMethods';
import Profile from './Profile';

export default class ProfileWithoutId {
	public readonly name: string;
	public readonly description: string;
	public readonly avatar: string;
	public readonly created_at: Date;
	public readonly updated_at: Date;
	public readonly archived_at: Date | null;
	constructor(profile: Omit<IProfile, "user_id"|"created_at"|"updated_at"|"archived_at"> & { created_at?: string; updated_at?: string; archived_at?: string | null; }) {
		this.name = profile.name;
		this.description = profile.description;
		this.avatar = profile.avatar;
		this.created_at = new Date(profile.created_at ?? Date.now());
		this.updated_at = new Date(profile.updated_at ?? Date.now());
		this.archived_at = profile.archived_at ? new Date(profile.archived_at) : null;
	}
	toJSON() {
		return {
			name: this.name,
			description: this.description,
			avatar: this.avatar,
			created_at: this.created_at.toISOString(),
			updated_at: this.updated_at.toISOString(),
			archived_at: this.archived_at?.toISOString() ?? null,
		};
	}
	static blank() {
		return new ProfileWithoutId({ name: '', description: '', avatar: '', created_at: new Date(), updated_at: new Date(), archived_at: null });
	}
}
