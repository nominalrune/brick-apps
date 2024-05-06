import Group from '../Group/Group';
import Profile from '../Profile/Profile';
import WithoutMethods from '../common/WithoutMethods';
import UserData from './UserData';
import NewUser from './NewUser';

export default class User extends NewUser{
	public readonly id: number;
	// NOTE overwriting type: Profile | null over ProfileWithoutId | null
	public readonly profile: Profile | null;

	constructor(user: WithoutMethods<User>) {
		super(user);
		this.id = user.id;
		this.profile = user.profile ? new Profile(user.profile) : null;
	}
	toJSON() {
		return {
			id: this.id,
			email: this.email,
			profile: this.profile?.toJSON(),
		};
	}
	static fromData(data: UserData) {
		return new User({
			id: data.id,
			email: data.email,
			profile: data.profile ? Profile.fromData(data.profile) : null,
			groups: data.groups ? data.groups.map(group => Group.fromData(group)) : null,
		});
	}
}

