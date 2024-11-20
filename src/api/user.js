import { axiosDefault, axiosAuth, axiosCanvas } from './index';
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
		
		console.log("token and user data",response.data?.user?.canvasToken, response.data?.user)
    	axiosCanvas.defaults.headers.common['Authorization'] = `Bearer ${response.data?.user?.canvasToken}`;

		return {status: response.status, data: response.data};
	} catch (error) {
		console.log(error);
		navigateTo('/login');
	}
}