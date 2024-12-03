import React from "react";

export const Sidebar = ({ children }) => {
    return <div className="min-w-48 lg:min-w-64 w-1/3 h-full overflow-y-scroll">{children}</div>;
};

Sidebar.Title = ({ children }) => {
    return <h2 className="mt-4 text-2xl font-bold text-gray-800">{children}</h2>;
};
Sidebar.Content = ({ children }) => {
    return <div className="flex flex-col items-center">{children}</div>;
};

export const Main = ({ children }) => {
    return <div className="flex flex-col gap-6 w-2/3 h-full">{children}</div>;
};


export const Title = Sidebar.Title;
export const Content = Sidebar.Content;
