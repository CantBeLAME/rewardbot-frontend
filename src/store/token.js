export function setCanvasToken(token) {
	localStorage.setItem('canvasToken', token); // Store token securely
}

export function getCanvasToken() {
	return localStorage.getItem('canvasToken'); // Store token securely
}

export function removeCanvasToken() {
	localStorage.removeItem('canvasToken'); // Store token securely
}
