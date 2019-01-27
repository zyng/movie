import React from 'react';


const Loading = ({ isActive }) => {
    return (
        <div className={`loading__logo ${isActive ? "active" : ''}`} >
            <div className="loading__logo--red"></div>
            <div className="loading__logo--yellow"></div>
            <div className="loading__logo--green"></div>
        </div>
    );
}

export default Loading;