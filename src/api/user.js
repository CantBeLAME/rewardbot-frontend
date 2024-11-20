import { axiosDefault, axiosAuth } from './index';
import navigateTo from '../utils/navigateTo';

export const apiGetUserByEmail = async ({ email }) => {
	try {
		const response = await axiosDefault.get(`user/email/${email}`);
		return response.data;
	} catch (error) {
		console.log(error);
		navigateTo('/login');
	}
};

export const apiGetUser = async () => {
	try {
		const response = await axiosAuth.get(`protected`);
		return response.data;
	} catch (error) {
		console.log(error);
		navigateTo('/login');
	}
};

export const apiPostUser = async (data) => {
	try {
		const response = await axiosDefault.post(`user`, data);
		return response.data;
	} catch (error) {
		console.log(error);
		navigateTo('/login');
	}
};


export const apiLogin = async ({ email, password }) => {
	try {
		const response = await axiosDefault.post('/login', { email, password });
		return {status: response.status, data: response.data};
	} catch (error) {
		console.log(error);
		navigateTo('/login');
	}
}