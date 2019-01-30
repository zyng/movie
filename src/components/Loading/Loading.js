import React from 'react';


const Loading = ({ isActive, page }) => {
    return (
        <div className={`loading__logo ${isActive ? "active" : ''} ${page ? "page" : ''}`} >
            <div className="loading__logo--red"></div>
            <div className="loading__logo--yellow"></div>
            <div className="loading__logo--green"></div>
        </div>
    );
}

export default Loading;