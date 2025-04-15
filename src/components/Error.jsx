import React from 'react'

const Error = ({newError}) => {
    return (
        <div className="error" ref={newError}>
            <div>
                <i className="fa-solid fa-xmark"></i>
            </div>
            <p>This task is already existing!!!</p>
        </div>
    )
}

export default Error