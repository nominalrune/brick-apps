import IProfile from '../Profile/IProfile';
import ProfileWithoutId from '../Profile/ProfileWithoutId';
import IUser from './IUser';

export default class UserWithoutId {
	public email: string;
	public profile: ProfileWithoutId | null;
	constructor(user: IUserWithoutId) {
		this.email = user.email;
		this.profile = user.profile ? new ProfileWithoutId(user.profile) : null;
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
			profile: ProfileWithoutId.blank()
		});
	}
}

type IUserWithoutId = Omit<IUser, "id" | "profile"> & { profile: Omit<IProfile, "user_id"> | null; };