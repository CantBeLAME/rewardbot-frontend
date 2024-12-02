import React from "react";

export const Sidebar = ({ children }) => {
    return <div className="w-64 h-full p-6 bg-white shadow-md">{children}</div>;
};

Sidebar.Title = ({ children }) => {
    return <h2 className="mt-4 text-2xl font-bold text-gray-800">{children}</h2>;
};
Sidebar.Content = ({ children }) => {
    return <div className="overflow-y-scroll flex flex-col items-center">{children}</div>;
};

export const Main = ({ children }) => {
    return <div className="p-6 w-full bg-gray-100">{children}</div>;
};


export const Title = Sidebar.Title;
export const Content = Sidebar.Content;
