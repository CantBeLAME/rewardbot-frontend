import React from 'react';
import Container from '../Container';
import Radio from '../Radio';

export default function Settings() {

    return (
        <Container className={"p-16 ml-6"}>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Settings</h2>
            <div className="space-y-4">
                todo list week month day
                show completed
            </div>
            <Radio/>
        </Container>
    );
};

