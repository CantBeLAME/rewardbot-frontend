import { axiosDefault, axiosAuth } from './index';

export const apiGetUserByEmail = async ({ email }) => {
	try {
		const response = await axiosDefault.get(`user/email/${email}`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const apiGetUser = async () => {
	try {
		const response = await axiosAuth.get(`protected`);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const apiPostUser = async (data) => {
	try {
		const response = await axiosDefault.post(`user`, data);
		console.log(response);
		return response.data;
	} catch (error) {
		throw error;
	}
};


export const apiLogin = async ({ email, password }) => {
	try {
		const response = await axiosDefault.post('/login', { email, password });
		console.log(response);
		return response.status
	} catch (error) {
		console.error(error);
		return error.response.data;
	}
}