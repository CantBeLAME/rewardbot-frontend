import React from "react";

export const Sidebar = ({ children }) => {
	return (
		<div className="h-full w-1/3 min-w-48 overflow-y-scroll lg:min-w-64">
			{children}
		</div>
	);
};

Sidebar.Title = ({ children }) => {
	return (
		<h2 className="mt-4 text-2xl font-bold text-gray-800">{children}</h2>
	);
};
Sidebar.Content = ({ children }) => {
	return <div className="flex flex-col items-center">{children}</div>;
};

export const Main = ({ children }) => {
	return <div className="flex h-full w-2/3 flex-col gap-6">{children}</div>;
};

export const Title = Sidebar.Title;
export const Content = Sidebar.Content;
