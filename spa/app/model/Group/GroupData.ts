import UserData from '../User/UserData';

export default interface GroupData {
	id: number;
	name: string;
	description: string;
	users: UserData[];
}
