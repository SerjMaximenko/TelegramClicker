import React, { useState, useEffect } from 'react';
import axios from "axios";

function ClientList() {
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        const response = axios.get('http://localhost:8080/clients').then(r => {
            console.log(r);
            return r;
        }
    )
        setClients(response.data);
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <div>
            <h2>Client List</h2>
            <ul>
                {clients.map((client, index) => (
                    <li key={index}>{client.name} ({client.email})</li>
                ))}
            </ul>
        </div>
    );
}

export default ClientList;