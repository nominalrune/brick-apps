import GroupData from '../Group/GroupData';
import ProfileData from '../Profile/ProfileData';

export default interface UserData {
	id: number;
	email: string;
	profile?: ProfileData;
	groups?: GroupData[]
}
