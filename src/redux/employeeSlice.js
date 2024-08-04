// src/redux/employeeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        list: [],
    },
    reducers: {
        setEmployees: (state, action) => {
            state.list = action.payload;
        },
        addEmployee: (state, action) => {
            state.list.push(action.payload);
        },
        removeEmployee: (state, action) => {
            state.list = state.list.filter(emp => emp._id !== action.payload);
        },
    },
});

export const { setEmployees, addEmployee, removeEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
