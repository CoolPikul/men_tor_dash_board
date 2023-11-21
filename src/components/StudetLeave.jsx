import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentLeave = () => {
    const [leaveList, setLeaveList] = useState([]);
    const [newLeave, setNewLeave] = useState({
        reg_no: 0,
        firstname: '',
        lastname: '',
        email: '',
        from_date: 0,
        till_date: 0,
    });

    useEffect(() => {
        axios.get('/api/v1/Student_leave/getAll')
            .then(response => setLeaveList(response.data))
            .catch(error => console.error('Error fetching leave:', error));
    }, []);

    const handleInputChange = (e) => {
        setNewLeave({ ...newLeave, [e.target.name]: e.target.value });
    };

    const addLeave = () => {
        axios.post('/api/v1/Student_leave/add', newLeave)
            .then(response => {
                setLeaveList([...leaveList, response.data]);
                setNewLeave({
                    reg_no: 0,
                    firstname: '',
                    lastname: '',
                    email: '',
                    from_date: 0,
                    till_date: 0,
                });
            })
            .catch(error => console.error('Error adding leave:', error));
    };

    return (
        <div>
            <h2>Student Leave</h2>
            <ul>
                {leaveList.map(leave => (
                    <li key={leave.reg_no}>{leave.firstname} {leave.lastname} - {leave.email} - {leave.from_date} to {leave.till_date}</li>
                ))}
            </ul>
            <div>
                <input type="number" name="reg_no" value={newLeave.reg_no} onChange={handleInputChange} placeholder="Registration Number" />
                <input type="text" name="firstname" value={newLeave.firstname} onChange={handleInputChange} placeholder="First Name" />
                <input type="text" name="lastname" value={newLeave.lastname} onChange={handleInputChange} placeholder="Last Name" />
                <input type="text" name="email" value={newLeave.email} onChange={handleInputChange} placeholder="Email" />
                <input type="number" name="from_date" value={newLeave.from_date} onChange={handleInputChange} placeholder="From Date" />
                <input type="number" name="till_date" value={newLeave.till_date} onChange={handleInputChange} placeholder="Till Date" />
                <button onClick={addLeave}>Add Leave</button>
            </div>
        </div>
    );
};

export default StudentLeave;
