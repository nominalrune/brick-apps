import Group from '../Group/Group';
import GroupWithoutId from '../Group/GroupWithoutId';
import Profile from '../Profile/Profile';
import ProfileWithoutId from '../Profile/ProfileWithoutId';
import WithoutId from '../common/WithoutId';
import WithoutMethods from '../common/WithoutMethods';
import User from './User';

export default class NewUser {
	public email: string;
	public profile: ProfileWithoutId;
	public password: string | null = null
	constructor(user: WithoutMethods<NewUser>) {
		this.email = user.email;
		this.profile = user.profile ? new ProfileWithoutId(user.profile) : null;
		this.groups = user.groups ? user.groups.map(group => new Group(group)) : null;
	}
	toJSON() {
		return {
			email: this.email,
			profile: this.profile?.toJSON(),
		};
	}
	static blank() {
		return new NewUser({
			email: '',
			profile: ProfileWithoutId.blank(),
			groups: null,
		});
	}
}

type IUserWithoutId = Omit<WithoutMethods<User>, "id" | "profile"> & { profile: Omit<WithoutMethods<Profile>, "user_id"> | null; };