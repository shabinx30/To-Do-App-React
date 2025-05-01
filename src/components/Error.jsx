import React from 'react'

const Error = ({ newError, alert }) => {
    return (
        <div className='error-main'>
            <div className="error" ref={newError}>
                <div style={{backgroundColor: alert.type == 'error' ? '#ff5454' : '#9dff00'}}>
                    <i className={`fa-solid ${alert.type == 'error' ? 'fa-xmark' : 'fa-check'}`}></i>
                </div>
                <p>{alert.message}</p>
            </div>
        </div>
    )
}

export default Error