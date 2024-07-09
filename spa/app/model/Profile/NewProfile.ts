import ProfileBase from './ProfileBase';

export default class NewProfile extends ProfileBase {
	static blank() {
		return new NewProfile({
			name: '',
			description: '',
			avatar: '',
			created_at: new Date(),
			updated_at: new Date(),
			archived_at: null
		});
	}
}
