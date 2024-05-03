import api from '~/lib/api';

export default class UserRepository {
	constructor() {
		this.api = api;
	}
	async getProfile() {
		const data = await this.api('/profile', 'GET');
		return data;
	}
	async updateProfile(profile) {
		const data = await this.api('/profile', 'POST', profile);
		return data;
	}
}