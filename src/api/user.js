import { axiosDefault, axiosAuth, axiosCanvas } from "./";
import navigateTo from "../utils/navigateTo";
import { removeCanvasToken, getUserID, removeUserID } from "../store/token";

export const apiGetUserByEmail = async ({ email }) => {
	try {
		const response = await axiosDefault.get(`user/email/${email}`);
		return response.data;
	} catch (error) {
		console.log(error);
		navigateTo("/");
	}
};

export const apiGetUser = async () => {
	try {
		const response = await axiosAuth.get(`protected`);

		return response.data;
	} catch (error) {
		console.log(error);
		navigateTo("/");
	}
};

export const apiPostUser = async (data) => {
	try {
		const response = await axiosDefault.post(`user`, data);
		return response.data;
	} catch (error) {
		console.log(error);
		navigateTo("/");
	}
};

export const apiLogin = async ({ email, password }) => {
	try {
		const response = await axiosDefault.post("/login", { email, password });

		return { status: response.status, data: response.data };
	} catch (error) {
		return error;
	}
};

export const apiLogout = async () => {
	try {
		const response = await axiosDefault.post("/logout");
		removeCanvasToken();
		removeUserID();
		axiosCanvas.defaults.headers.common["Authorization"] = "";
		return response.data;
	} catch (error) {
		console.log(error);
		navigateTo("/");
	}
};

export const apiPutUser = async (data) => {
	const id = getUserID();
	try {
		const response = await axiosAuth.put(`/user/${id}`, data);
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
