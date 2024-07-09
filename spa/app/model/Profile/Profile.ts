import WithoutMethods from '../common/WithoutMethods';
import ProfileData from './ProfileData';
import ProfileBase from './ProfileBase';

export default class Profile extends ProfileBase {
	public readonly user_id: number;
	public readonly created_at: Date;
	public readonly updated_at: Date;
	public readonly archived_at: Date | null;
	/** @override */
	constructor(profile: WithoutMethods<Profile>) {
		super(profile);
		this.user_id = profile.user_id;
		this.created_at = profile.created_at;
		this.updated_at = profile.updated_at;
		this.archived_at = profile.archived_at;
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
	/**
	 * @override
	 */
	toJSON() {
		return {
			user_id: this.user_id,
			...super.toJSON(),
		};
	}
}

