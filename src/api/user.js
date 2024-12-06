import { axiosDefault, axiosAuth, axiosCanvas } from "./";
import navigateTo from "../utils/navigateTo";
import { removeCanvasToken } from "../store/token";

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
		console.log(error);
		navigateTo("/");
	}
};

export const apiLogout = async () => {
	try {
		const response = await axiosDefault.post("/logout");
		removeCanvasToken();
		axiosCanvas.defaults.headers.common["Authorization"] = "";
		return response.data;
	} catch (error) {
		console.log(error);
		navigateTo("/");
	}
};

export const apiOption = async ({ id, option }) => {
	try {
		const response = await axiosAuth.patch(`/user/${id}/option`, {
			option,
		});
		console.log(response);

		return response.data;
	} catch (error) {
		console.log(error);
	}
};

export const apiShowCompleted = async ({ id, showCompleted }) => {
	try {
		const response = await axiosAuth.patch(`/user/${id}/showCompleted`, {
			showCompleted,
		});
		return response.data;
	} catch (error) {
		console.log(error);
	}
};
