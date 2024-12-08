export function setCanvasToken(token, id) { // Store token securely
	localStorage.setItem("canvasToken", token); // Store token securely
}

export function getCanvasToken() {
	return localStorage.getItem("canvasToken"); // Store token securely
}

export function removeCanvasToken() {
	localStorage.removeItem("canvasToken"); // Store token securely
}

export function setUserID(id) {
	localStorage.setItem("rewardBotID", id); // Store token securely
}

export function getUserID() {
	return localStorage.getItem("rewardBotID"); // Store token securely
}

export function removeUserID() {
	localStorage.removeItem("rewardBotID"); // Store token securely
}
