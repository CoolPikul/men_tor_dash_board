
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentAttendance = () => {
    const [attendanceList, setAttendanceList] = useState([]);
    const [newAttendance, setNewAttendance] = useState({ student_name: '', reg_no: '', attendance: 0.0 });

    useEffect(() => {
        axios.get('/api/v1/Student_attendance/getAllAttendance')
            .then(response => setAttendanceList(response.data))
            .catch(error => console.error('Error fetching attendance:', error));
    }, []);

    const handleInputChange = (e) => {
        setNewAttendance({ ...newAttendance, [e.target.name]: e.target.value });
    };

    const addAttendance = () => {
        axios.post('/api/v1/Student_attendance/add', newAttendance)
            .then(response => {
                setAttendanceList([...attendanceList, response.data]);
                setNewAttendance({ student_name: '', reg_no: '', attendance: 0.0 });
            })
            .catch(error => console.error('Error adding attendance:', error));
    };

    return (
        <div>
            <h2>Student Attendance</h2>
            <ul>
                {attendanceList.map(attendance => (
                    <li key={attendance.id}>{attendance.student_name} - {attendance.reg_no} - {attendance.attendance}</li>
                ))}
            </ul>
            <div>
                <input type="text" name="student_name" value={newAttendance.student_name} onChange={handleInputChange} placeholder="Student Name" />
                <input type="text" name="reg_no" value={newAttendance.reg_no} onChange={handleInputChange} placeholder="Registration Number" />
                <input type="number" name="attendance" value={newAttendance.attendance} onChange={handleInputChange} placeholder="Attendance" />
                <button onClick={addAttendance}>Add Attendance</button>
            </div>
        </div>
    );
};

export default StudentAttendance;
