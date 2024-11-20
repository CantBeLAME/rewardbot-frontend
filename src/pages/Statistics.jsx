import { getCanvasCourse } from "../api/canvas";
import React from "react";
import { useAuth } from '../hooks/auth/useAuth';


export default function Statistics() {
    const { loading} = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }

    console.log(getCanvasCourse());
    return (
        <div>
            Statistics
        </div>
    );
}
