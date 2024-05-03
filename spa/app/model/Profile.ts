import ProfileData from './ProfileData';

export default class Profile {
	public readonly user_id?: number;
	public readonly name: string;
	public readonly description: string;
	public readonly avatar: string;
	public readonly created_at: Date;
	public readonly updated_at: Date;
	public readonly archived_at: Date | null;
	constructor(profile: IProfile) {
		this.user_id = profile.user_id;
		this.name = profile.name;
		this.description = profile.description;
		this.avatar = profile.avatar;
		this.created_at = new Date(profile.created_at);
		this.updated_at = new Date(profile.updated_at);
		this.archived_at = profile.archived_at ? new Date(profile.archived_at) : null;
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
	static blank(){
		return new Profile({name:'',description:'',avatar:'',created_at:new Date(),updated_at:new Date(),archived_at:null});
	}
}

interface IProfile {
	user_id?: number;
	name: string;
	description: string;
	avatar: string;
	created_at: Date;
	updated_at: Date;
	archived_at: Date | null;
}