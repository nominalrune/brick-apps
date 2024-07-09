import Group from '../Group/Group';
import Profile from '../Profile/Profile';
import WithoutMethods from '../common/WithoutMethods';
import UserData from './UserData';
import NewUser from './NewUser';
import UserBase from './UserBase';

export default class User extends UserBase {
	public readonly id: number;
	// NOTE overwriting type: Profile | null over ProfileBase | null
	public readonly profile: Profile | null;
	public groups: Group[] | null;

	constructor(user: WithoutMethods<User>) {
		super(user);
		this.id = user.id;
		this.profile = user.profile ? new Profile(user.profile) : null;
		this.groups = user.groups ? user.groups.map(group => new Group(group)) : null;
	}
	toJSON(): UserData{
		return {
			id: this.id,
			email: this.email,
			...(this.profile ? { profile: this.profile?.toJSON() } : {}),
			...(this.groups ? { groups: this.groups.map(group => group.toJSON()) } : {}),
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

