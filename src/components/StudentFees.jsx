import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentFees = () => {
    const [feesList, setFeesList] = useState([]);
    const [newFees, setNewFees] = useState({
        student_name: '',
        amount: 0,
        deposited_at: 0,
        description: '',
        note: '',
    });

    useEffect(() => {
        axios.get('/api/v1/Student_fees/getAll')
            .then(response => setFeesList(response.data))
            .catch(error => console.error('Error fetching fees:', error));
    }, []);

    const handleInputChange = (e) => {
        setNewFees({ ...newFees, [e.target.name]: e.target.value });
    };

    const addFees = () => {
        axios.post('/api/v1/Student_fees/add', newFees)
            .then(response => {
                setFeesList([...feesList, response.data]);
                setNewFees({
                    student_name: '',
                    amount: 0,
                    deposited_at: 0,
                    description: '',
                    note: '',
                });
            })
            .catch(error => console.error('Error adding fees:', error));
    };

    return (
        <div>
            <h2>Student</h2>
            <ul>
                {feesList.map(fees => (
                    <li key={fees.id}>{fees.student_name} - {fees.amount} - {fees.deposited_at} - {fees.description} - {fees.note}</li>
                ))}
            </ul>
            <div>
                <input type="text" name="student_name" value={newFees.student_name} onChange={handleInputChange} placeholder="Student Name" />
                <input type="number" name="amount" value={newFees.amount} onChange={handleInputChange} placeholder="Amount" />
                <input type="number" name="deposited_at" value={newFees.deposited_at} onChange={handleInputChange} placeholder="Deposited At" />
                <input type="text" name="description" value={newFees.description} onChange={handleInputChange} placeholder="Description" />
                <input type="text" name="note" value={newFees.note} onChange={handleInputChange} placeholder="Note" />
                <button onClick={addFees}>Add Fees</button>
            </div>
        </div>
    );
};

export default StudentFees;
