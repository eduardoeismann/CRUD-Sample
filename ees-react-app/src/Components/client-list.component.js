import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ClientTableRow from "./ClientTableRow";

const ClientList = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:4000/clients/")
            .then(({ data }) => {
                setClients(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const DataTable = () => {
        return clients.map((res, i) => {
            return <ClientTableRow obj={res} key={i} />;
        });
    };

    return (
        <div className="table-wrapper">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Roll No</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{DataTable()}</tbody>
            </Table>
        </div>
    );
};

export default ClientList;
