// src/components/EmployeeDetails.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
    const { id } = useParams();
    const [employee, setEmployee] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            const response = await axios.get(`http://localhost:8000/api/v1/employee/${id}`);
            setEmployee(response.data);
        };
        fetchEmployee();
    }, [id]);

    if (!employee) return <p>Loading...</p>;

    return (
        <div>
            <h1>{employee.name}</h1>
            <p>ID: {employee._id}</p>
            <p>Address: {employee.address.line1}, {employee.address.city}, {employee.address.country}, {employee.address.zip}</p>
            <h2>Contact Methods</h2>
            <ul>
                {employee.contactMethods.map((contact) => (
                    <li key={contact.value}>{contact.contact_method}: {contact.value}</li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeDetails;
