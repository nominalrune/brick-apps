import GroupBase from '../Group/GroupBase';
import ProfileBase from '../Profile/ProfileBase';
import WithoutMethods from '../common/WithoutMethods';

export default class UserBase {
	public email: string;
	public profile: ProfileBase | null;
	public groups: GroupBase[] | null;
	constructor(user: WithoutMethods<UserBase>) {
		this.email = user.email;
		this.profile = user.profile ? new ProfileBase(user.profile) : null;
		this.groups = user.groups ? user.groups.map(group => new GroupBase(group)) : null;
	}
	toJSON():{email: string, profile?: ReturnType<ProfileBase["toJSON"]>, groups?: ReturnType<GroupBase["toJSON"]>[]} {
		return {
			email: this.email,
			...(this.profile ? { profile: this.profile?.toJSON() } : {}),
			...(this.groups ? { groups: this.groups.map(group => group.toJSON()) } : {}),
		};
	}
}