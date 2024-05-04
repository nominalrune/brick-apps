import IUser from '../User/IUser';

export interface IGroup {
	id: number;
	name: string;
	description: string;
	users: IUser[];
}