import { getCanvasCourse } from "../api/canvas";
import React from "react";
// import apiReq from "../database/api/canvas";
// import { Link } from "react-router-dom"
// import { Fieldset, Form, Input, Label } from "../components/Form";
// import { Button } from "../components/Button";
// import { apiLogin } from '../database/api/user';
// import { useNavigate } from "react-router-dom";


export default function Statistics() {
    // console.log(getCourseColors());

    getCanvasCourse()
    return (
        <div>
            Statistics
        </div>
    );
}
