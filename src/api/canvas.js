import { axiosCanvas } from '.';
import axios from 'axios';
import JSONBigInt from 'json-bigint';
import { getCanvasToken } from '../store/token';
import Popup from 'react-popup';
import { setCanvasToken } from '../store/token';

export async function getCanvasCourse() {
	try {
		const { status, data } = await axiosCanvas.get('/courses');

		return { status, data };
	} catch (error) {
		console.log(
			'Error fetching Canvas course data:',
			error.response?.data || error.message,
		);
	}
}

export async function getCanvasUser() {
	try {
		const canvasToken = getCanvasToken();

		axiosCanvas.defaults.headers.common['Authorization'] =
			`Bearer ${canvasToken}`;
		const res = await axiosCanvas.get('/users/self');

		return { status: res.status, data: res.data };
	} catch (error) {
		console.error(
			'Error fetching Canvas course data:',
			error.response?.data || error.message,
		);
	}
}

export async function validateToken(getCanvasInfo, cancel, save) {
	const attempt = async () => {
		try {
			const canvasToken = getCanvasToken();

			axiosCanvas.defaults.headers.common['Authorization'] =
				`Bearer ${canvasToken}`;
			const { data } = await getCanvasInfo();

			save(data);
		} catch (err) {
			Popup.plugins().canvasTokenPopup(
				(value) => {
					console.log('Cancel clicked. Token value:', value);
					Popup.close();
					cancel();
				},
				async (token) => {
					console.log('New token entered:', token);
					setCanvasToken(token);
					Popup.close();
					// TODO: Save the token somewhere (e.g., in state or local storage)

					// Re-fetch data after saving the new token
					await attempt();
				},
			);
		}
	};
	await attempt();
}

const parseLinkHeader = (link) => {
	const re = /<([^>]+)>; rel="([^"]+)"/g;
	let arrRes;
	const ret = {};
	while ((arrRes = re.exec(link)) !== null) {
		ret[arrRes[2]] = {
			url: arrRes[1],
			page: arrRes[2],
		};
	}
	return ret;
};

export async function getPaginatedRequest(url, recurse = false) {
	try {
		const res = await axios.get(url, {
			transformResponse: [(data) => JSONBigInt.parse(data)],
		});

		if (recurse && 'link' in res.headers) {
			const parsed = parseLinkHeader(res.headers['link']);
			if (parsed && 'next' in parsed && parsed['next'].url !== url)
				return res.data.concat(
					await getPaginatedRequest(parsed['next'].url, true),
				);
		}

		return res.data;
	} catch (err) {
		console.error(err);
		return []; // still return all successful pages if error instead of hanging
	}
}
