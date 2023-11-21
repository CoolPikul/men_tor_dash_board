
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Mentor = () => {
    const [mentors, setMentors] = useState([]);
    const [newMentor, setNewMentor] = useState({ firstName: '', lastName: '', emailId: '' });

    useEffect(() => {
        // Fetch mentors from backend on component mount
        axios.get('/api/v1/mentor')
            .then(response => setMentors(response.data))
            .catch(error => console.error('Error fetching mentors:', error));
    }, []);

    const handleInputChange = (e) => {
        setNewMentor({ ...newMentor, [e.target.name]: e.target.value });
    };

    const addMentor = () => {
        axios.post('/api/v1/mentor/post', newMentor)
            .then(response => {
                setMentors([...mentors, response.data]);
                setNewMentor({ firstName: '', lastName: '', emailId: '' });
            })
            .catch(error => console.error('Error adding mentor:', error));
    };

    return (
        <div>
            <h2>Mentor</h2>
            {/* Display mentors */}
            <ul>
                {mentors.map(mentor => (
                    <li key={mentor.id}>{mentor.firstName} {mentor.lastName} - {mentor.emailId}</li>
                ))}
            </ul>
            {/* Add new mentor form */}
            <div>
                <input type="text" name="firstName" value={newMentor.firstName} onChange={handleInputChange} placeholder="First Name" />
                <input type="text" name="lastName" value={newMentor.lastName} onChange={handleInputChange} placeholder="Last Name" />
                <input type="text" name="emailId" value={newMentor.emailId} onChange={handleInputChange} placeholder="Email ID" />
                <button onClick={addMentor}>Add Mentor</button>
            </div>
        </div>
    );
};

export default Mentor;
