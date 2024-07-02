import React, { useState } from 'react';
import axios from "axios";

function ClientForm({ onClientAdded }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fetchPostClient = () => {
            axios.post()
        }

        const response = await fetch('/clients', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email })
        });

        if (response.ok) {
            onClientAdded();
            setName('');
            setEmail('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>
                    Name:
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </label>
            </div>
            <button type="submit">Create Client</button>
        </form>
    );
}

export default ClientForm;