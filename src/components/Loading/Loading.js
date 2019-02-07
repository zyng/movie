import React from 'react';


const Loading = ({ isActive, page, history }) => {
    return (
        <div className={`loading__logo ${isActive ? "active" : ''} ${page ? "page" : ''} ${history ? 'history' : ''}`} >
            <div className={`${history ? 'loading__logo--standard' : 'loading__logo--red'}`}></div>
            <div className={`${history ? 'loading__logo--standard' : 'loading__logo--yellow'}`}></div>
            <div className={`${history ? 'loading__logo--standard' : 'loading__logo--green'}`}></div>
        </div>
    );
}

export default Loading;