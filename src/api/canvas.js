import { axiosCanvas } from ".";
import { getCanvasToken } from "../store/token";
import Popup from "react-popup";
import { setCanvasToken } from "../store/token";
import { convertPlannerAssignments } from "../utils/convertAssignments";

export async function getCanvasCourse() {
	try {
		const { status, data } = await axiosCanvas.get("/courses");

		return { status, data };
	} catch (error) {
		console.log(
			"Error fetching Canvas course data:",
			error.response?.data || error.message,
		);
	}
}

/* Get assignments from api */
export async function getAssignmentsTimeRange() {
	async function getAllAssignmentsRequest(start, end, allPages = true) {
		// assumption: this request will succeed, otherwise we should throw a fatal error and not load

		const initialURL = `/planner/items?start_date=${start}${
			end ? "&end_date=" + end : ""
		}&per_page=1000`;
		return await getPaginatedRequest(initialURL, allPages);
	}
	/* Expand bounds by 1 day to account for possible time zone differences with api. */
	// Assuming startDate and endDate are strings or Date objects:
	const startDate = new Date("2024-12-01"); // Example start date
	const endDate = new Date("2024-12-10"); // Example end date

	// Create new Date objects for manipulation
	const st = new Date(startDate);
	st.setDate(st.getDate() - 1); // Subtract 1 day

	const en = new Date(endDate);
	en.setDate(en.getDate() + 1); // Add 1 day

	const startStr = st.toISOString().split("T")[0];
	const endStr = en.toISOString().split("T")[0];
	const data = await getAllAssignmentsRequest(startStr, endStr);

	return { data: convertPlannerAssignments(data || []) };
}

export async function getCanvasUser() {
	try {
		const res = await axiosCanvas.get("/users/self");
		return { status: res.status, data: res.data };
	} catch (error) {
		console.error(
			"Error fetching Canvas course data:",
			error.response?.data || error.message,
		);
	}
}

export async function validateToken(getCanvasInfo, save, cancel) {
	const attempt = async () => {
		try {
			const canvasToken = getCanvasToken();

			axiosCanvas.defaults.headers.common["Authorization"] =
				`Bearer ${canvasToken}`;
			const { data } = await getCanvasInfo();

			save(data);
		} catch (err) {
			Popup.plugins().canvasTokenPopup(
				async (token) => {
					console.log("New token entered:", token);
					setCanvasToken(token);
					Popup.close();
					// TODO: Save the token somewhere (e.g., in state or local storage)

					// Re-fetch data after saving the new token
					await attempt();
				},
				(value) => {
					console.log("Cancel clicked. Token value:", value);
					Popup.close();
					cancel();
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
		const res = await axiosCanvas.get(url);

		if (recurse && "link" in res.headers) {
			const parsed = parseLinkHeader(res.headers["link"]);
			if (parsed && "next" in parsed && parsed["next"].url !== url)
				return res.data.concat(
					await getPaginatedRequest(parsed["next"].url, true),
				);
		}

		return res.data;
	} catch (err) {
		console.error(err);
		return []; // still return all successful pages if error instead of hanging
	}
}
