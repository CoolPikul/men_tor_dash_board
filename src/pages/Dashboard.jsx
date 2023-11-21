import React from 'react';
import { Link } from 'react-router-dom';


const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <header>
                <h2>Admin Dashboard</h2>
            </header>
            <div className="dashboard-links">
                <Link to="/mentor">Mentor</Link>
                <Link to="/student-attendance">Student Attendance</Link>
                <Link to="/student-fees">Student Fees</Link>
                <Link to="/student-leave">Student Leave</Link>
            </div>
        </div>
    );
};

export default Dashboard;
