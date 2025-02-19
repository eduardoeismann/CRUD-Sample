// EditClient Component for update client data
// Import Modules
import React, { useState, useEffect } from "react";
import axios from "axios";
import ClientForm from "./ClientForm";

// EditClient Component
const EditClient = (props) => {
    const [formValues, setFormValues] =
        useState(
            {
                name: "",
                email: "",
                rollno: "",
            }
        );

    //onSubmit handler
    const onSubmit = (clientObject) => {
        axios.put(
            "htp://localhost:4000/clients/clients/" +
            props.match.params.id,
            clientObject
        )
        .then((res) => {
            if (res.status === 200) {
                alert("Client successfully updated");
                props.history.push("/client-list");
            } else {
                Promise.reject();
            }
        })
        .catch(
            (err) => alert("Something went wrong")
        );
    };

    // Load data from server and reinitialize client form
    useEffect(() => {
        axios.get(
            "htp://localhost:4000/clients/update-client/"
            + props.match.params.id
        )
        .then((res) => {
            const {
                name,
                email,
                rollno
            } = res.data;
            setFormValues(
                {
                    name,
                    email,
                    rollno
                });
        })
        .catch(
            (err) =>
                console.log(err)
        );
    }, []);

    // Return client form
    return (
        <ClientForm
            initialValues={formValues}
            onSubmit={onSubmit}
            enableReinitialize>
            Update Client
        </ClientForm>
    );
};

// Export EditClient Component
export default EditClient;
