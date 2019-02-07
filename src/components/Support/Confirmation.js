import React from 'react';

const Confirmation = ({ children }) => {
    return (
        <div class="form-confirm animated fadeIn">
            <span class="fa fa-envelope-open-o" aria-hidden="true"></span>
            {children}
        </div>
    );
}

export default Confirmation;