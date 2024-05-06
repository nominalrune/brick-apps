import Group from '../Group/Group';
import GroupWithoutId from '../Group/GroupWithoutId';
import Profile from '../Profile/Profile';
import ProfileWithoutId from '../Profile/ProfileWithoutId';
import WithoutId from '../common/WithoutId';
import WithoutMethods from '../common/WithoutMethods';
import User from './User';

export default class UserWithoutId {
	public email: string;
	public profile: ProfileWithoutId | null;
	public groups: Group[] | null;
	// constructor(user: WithoutId<WithoutMethods<User>, "id"|"user_id">) {
	constructor(user: IUserWithoutId) {
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
		return new UserWithoutId({
			email: '',
			profile: ProfileWithoutId.blank(),
			groups: null,
		});
	}
}

type IUserWithoutId = Omit<WithoutMethods<User>, "id" | "profile"> & { profile: Omit<WithoutMethods<Profile>, "user_id"> | null; };