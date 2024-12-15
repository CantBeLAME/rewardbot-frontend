import { apiGetUser } from "../../api/user";
import { useEffect, useState } from "react";
import { validateToken, getCanvasUser } from "../../api/canvas";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			try {
				const data = await apiGetUser();
				setUser(data.user);
			} catch (error) {
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchUser();
	}, []);

	return {
		user: {
			id: user?._id,
			email: user?.email,
			password: user?.password,
			canvasToken: user?.canvasToken,
			createdAt: user?.createdAt,
			option: user?.option,
			showCompleted: user?.showCompleted,
			completed: user?.completed,
			score: user?.score,
		},
		loading,
	};
};

export const useCanvasAuth = () => {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		validateToken(
			getCanvasUser,
			(data) => {
				setUser(data);
				setLoading(false);
			},
			() => {
				navigate("/");
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return {
		canvasUser: {
			image: user?.avatar_url,
			firstname: user?.first_name,
			id: user?.id,
			lastname: user?.last_name,
		},
		loadingCanvas: loading,
	};
};
