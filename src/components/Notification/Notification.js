import React from 'react';

const Notification = (props) => {
    const { error, success, children, close } = props;
    return (
        <div className={`notification ${error ? 'error' : ''} ${success ? 'success' : ''}`}>
            <div className="close" onClick={close}></div>
            <div className="notification-content">
                {children}
            </div>
        </div>
    );
}

export default Notification;