// src/components/EmployeeList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployees, removeEmployee } from '../redux/employeeSlice';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.list);

    useEffect(() => {
        const fetchEmployees = async () => {
            const response = await axios.get('http://localhost:8000/api/v1/employee');
            dispatch(setEmployees(response.data));
        };
        fetchEmployees();
    }, [dispatch]);

    const handleDelete = async (id) => {
        await axios.delete(`http://localhost:8000/api/v1/employee/${id}`);
        dispatch(removeEmployee(id));
    };

    return (
        <div>
            <h1>Employee List</h1>
            {employees.length === 0 ? (
                <p>No Employees in the system.</p>
            ) : (
                <ul>
                    {employees.map((employee) => (
                        <li key={employee._id}>
                            <Link to={`/employee/${employee._id}`}>{employee.name}</Link>
                            <button onClick={() => handleDelete(employee._id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/add-employee">Add Employee</Link>
        </div>
    );
};

export default EmployeeList;
