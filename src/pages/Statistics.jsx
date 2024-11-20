import { getCanvasCourse } from "../api/canvas";
import React from "react";
import { useAuth } from '../hooks/auth/useAuth';
// import apiReq from "../database/api/canvas";
// import { Link } from "react-router-dom"
// import { Fieldset, Form, Input, Label } from "../components/Form";
// import { Button } from "../components/Button";
// import { apiLogin } from '../database/api/user';
// import { useNavigate } from "react-router-dom";


export default function Statistics() {
    const { user: { canvasToken } , loading} = useAuth();
    if (loading) {
        return <div>Loading...</div>;
    }

    // console.log("token and user data in stats", canvasToken)

    console.log(getCanvasCourse(canvasToken));
    return (
        <div>
            Statistics
        </div>
    );
}
