// CreateClient Component for add new client
// Import Modules
import React, { useState, useEffect } from "react";
import axios from 'axios';
import ClientForm from "./ClientForm";

// CreateClient Component
const CreateClient = () => {
    const [formValues, setFormValues] =
        useState({
            name: '',
            email: '',
            rollno: ''
        });
    // onSubmit handler
    const onSubmit = clientObject => {
            axios.post(
                'http://localhost:4000/clients/clients',
                clientObject
            ).then(res => {
                    if (res.status === 200) {
                        alert('Client successfully created');
                    } else {
                        Promise.reject();
                    }
            }).catch(err => alert('Something went wrong'));
        }

    // Return client form
    return (
        <ClientForm initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
            Create Client
        </ClientForm>
    )
}

// Export CreateClient Component
export default CreateClient
