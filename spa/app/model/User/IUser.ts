import IProfile from '../Profile/IProfile';

export default interface IUser {
	id:number;
	email: string;
	profile: IProfile | null;
}
