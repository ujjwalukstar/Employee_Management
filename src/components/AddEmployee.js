// src/components/AddEmployee.js
import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../redux/employeeSlice';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [input, setInput] = useState({
        name: '',
        address: { line1: '', city: '', country: '', zip: '' },
        contactMethods: [{ contact_method: '', value: '' }]
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.startsWith('address.')) {
            const addressField = name.split('.')[1];
            setInput(prev => ({
                ...prev,
                address: { ...prev.address, [addressField]: value }
            }));
        } else if (name.startsWith('contactMethod.')) {
            const index = Number(name.split('.')[1]);
            const field = name.split('.')[2];
            const newContactMethods = [...input.contactMethods];
            newContactMethods[index][field] = value;
            setInput(prev => ({ ...prev, contactMethods: newContactMethods }));
        } else {
            setInput(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:8000/api/v1/employee', input);
        dispatch(addEmployee(response.data));
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add Employee</h1>
            <input type="text" name="name" value={input.name} onChange={handleChange} placeholder="Name" required />
            <input type="text" name="address.line1" value={input.address.line1} onChange={handleChange} placeholder="Address Line 1" required />
            <input type="text" name="address.city" value={input.address.city} onChange={handleChange} placeholder="City" required />
            <input type="text" name="address.country" value={input.address.country} onChange={handleChange} placeholder="Country" required />
            <input type="text" name="address.zip" value={input.address.zip} onChange={handleChange} placeholder="Zip Code" required />
            {input.contactMethods.map((contact, index) => (
                <div key={index}>
                    <select name={`contactMethod.${index}.contact_method`} onChange={handleChange}>
                        <option value="">Select Contact Method</option>
                        <option value="EMAIL">Email</option>
                        <option value="PHONE">Phone</option>
                    </select>
                    <input type="text" name={`contactMethod.${index}.value`} value={contact.value} onChange={handleChange} placeholder="Value" required />
                </div>
            ))}
            <button type="submit">Add Employee</button>
        </form>
    );
};

export default AddEmployee;
