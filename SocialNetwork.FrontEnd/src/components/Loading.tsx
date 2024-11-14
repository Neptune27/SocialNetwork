import React from 'react';
import './Loading.css'; // Đường dẫn tới file CSS cho style

const Loading: React.FC = () => {
    return (
        <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default Loading;
