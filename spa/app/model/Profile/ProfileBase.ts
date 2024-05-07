import WithoutMethods from '../common/WithoutMethods';

export default class ProfileBase {
	public name: string;
	public description: string;
	public avatar: string;
	public created_at?: Date;
	public updated_at?: Date;
	public archived_at?: Date | null;
	constructor(profile: WithoutMethods<ProfileBase>) {
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
			created_at: this.created_at?.toISOString(),
			updated_at: this.updated_at?.toISOString(),
			archived_at: this.archived_at?.toISOString() ?? null,
		};
	}
}
