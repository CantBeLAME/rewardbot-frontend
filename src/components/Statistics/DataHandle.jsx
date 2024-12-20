import React, { useRef, useEffect, useState } from "react";
// import BarChart from './BarChart';
import { AssignmentStatus } from "../../const/assignments";
import Container from "../Container";

import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

export default function DataHandle({ data }) {
	const containerRef = useRef(null);
	const [dataset, setDataSet] = useState([]);
	const [containerWidth, setContainerWidth] = useState(0);

	useEffect(() => {
		// Update container width on load and resize
		const updateWidth = () => {
			if (containerRef.current) {
				setContainerWidth(containerRef.current.offsetWidth);
			}
		};

		updateWidth();
		window.addEventListener("resize", updateWidth);

		return () => {
			window.removeEventListener("resize", updateWidth);
		};

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [containerRef, containerRef.current, containerRef.current?.offsetWidth]);

	useEffect(() => {
		function stack(assignments) {
			const courseCounts = {};

			// Count assignments for each course
			assignments.forEach((assignment) => {
				// const courseId = assignment.course_id;
				const course = assignment.context_name;

				if (!courseCounts[course]) {
					courseCounts[course] = {
						complete: 0,
						late: 0,
						missing: 0,
						nosubmission: 0,
					};
				}
				switch (assignment.submition_status) {
					case AssignmentStatus.COMPLETE:
						courseCounts[course].complete++;
						break;
					case AssignmentStatus.LATE:
						courseCounts[course].late++;
						break;
					case AssignmentStatus.MISSING:
						courseCounts[course].missing++;
						break;
					case AssignmentStatus.NOSUBMISSION:
						courseCounts[course].nosubmission++;
						break;
					default:
						break;
				}
			});

			// Convert courseCounts object to an array
			return Object.entries(courseCounts).map(
				([course, { complete, late, missing, nosubmission }]) => ({
					label: course,
					complete,
					late,
					missing,
					nosubmission,
				}),
			);
		}
		// console.log(stack(data));
		setDataSet(stack(data));
	}, [data]);

	return (
		<div ref={containerRef} className="flex h-full w-full">
			<Container className={"flex items-center justify-center"}>
				<ResponsiveContainer width="100%" height={700}>
					<BarChart
						isAnimationActive={false}
						className="h-full w-full"
						data={dataset}
						margin={{ top: 20, right: 30, left: 30, bottom: 70 }}
					>
						<CartesianGrid />
						<XAxis
							dataKey="label"
							angle={-45}
							interval={0}
							tick={({ x, y, payload }) => {
								const maxLabelLength =
									containerWidth < 750
										? 5
										: containerWidth < 1000
											? 7
											: 10; // Adjust max characters

								return (
									<text
										x={x}
										y={y + 15}
										textAnchor="middle"
										fill="#666"
									>
										<tspan x={x} dy={0}>
											{payload.value.length >
											maxLabelLength
												? `${payload.value.slice(0, maxLabelLength)}...`
												: payload.value}
										</tspan>
									</text>
								);
							}}
						/>
						<YAxis />
						<Tooltip allowEscapeViewBox={{ x: true, y: true }} />
						<Legend
							verticalAlign="top"
							align="right"
							layout="vertical"
							wrapperStyle={{ paddingLeft: 20 }}
						/>
						<Bar
							dataKey="nosubmission"
							stackId="a"
							fill="#f18125"
						/>
						<Bar dataKey="missing" stackId="a" fill="#ffdb69" />
						<Bar dataKey="late" stackId="a" fill="#7cc0f7" />
						<Bar dataKey="complete" stackId="a" fill="#3a8ad8" />
					</BarChart>
				</ResponsiveContainer>
			</Container>
		</div>
	);
}
