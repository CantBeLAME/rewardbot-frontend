import React, { useState } from 'react';
import Container from '../Container';
import { IoMdSettings } from "react-icons/io";
import Checkbox from '../Checkbox';
import Radio from "../Radio";

export default function Settings({ user: { option, showCompleted } }) {
    const [selectedOption, setSelectedOption] = useState(option); 
    const [isChecked, setIsChecked] = useState(showCompleted);
    
    const choose = [
        { value: "Day", label: "Day" },
        { value: "Week", label: "Week" },
        { value: "Month", label: "Month" },
        { value: "Semester", label: "Semester" },
    ];


    return (
        <Container className={"p-16 ml-6"}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex gap-4 items-center text-center"><IoMdSettings />Settings</h2>
            <Radio options={choose} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
            <Checkbox isChecked={isChecked} setIsChecked={setIsChecked}><span>Show Completed Assignments</span></Checkbox>
        </Container>
    );
};
