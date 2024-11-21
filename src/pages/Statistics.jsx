import React, { useEffect, useState } from "react";
import { getCanvasCourse, validateToken } from "../api/canvas";
import { useAuth } from "../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function Statistics() {
	const { loading } = useAuth();
	const navigate = useNavigate();
	const [stats, setStats] = useState([]);

	useEffect(() => {
		validateToken(
			getCanvasCourse,
			() => {
				navigate("/login");
			},
			(data) => {
				setStats(data);
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<div>
			{stats.map(({ id }) => (
				<p key={id}>{id}</p>
			))}
		</div>
	);
}
