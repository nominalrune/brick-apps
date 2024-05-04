import IProfile from './IProfile';
import ProfileData from './ProfileData';
import ProfileWithoutId from './ProfileWithoutId';

export default class Profile extends ProfileWithoutId {
	public readonly user_id: number;
	constructor(profile: IProfile) {
		super(profile);
		this.user_id = profile.user_id;
	}
	static fromData(data: ProfileData) {
		const created_at = new Date(data.created_at);
		const updated_at = new Date(data.updated_at);
		const archived_at = data.archived_at ? new Date(data.archived_at) : null;
		return new Profile({
			...data,
			created_at,
			updated_at,
			archived_at,
		});
	}
	toJSON() {
		return {
			user_id: this.user_id,
			name: this.name,
			description: this.description,
			avatar: this.avatar,
			created_at: this.created_at.toISOString(),
			updated_at: this.updated_at.toISOString(),
			archived_at: this.archived_at?.toISOString() ?? null,
		};
	}
}

