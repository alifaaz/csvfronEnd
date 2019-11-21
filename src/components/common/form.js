import React from 'react'

const form = ({ onsubmit,children}) => (
    <form onSubmit={onsubmit} className="ui form">
        {children}
    </form>
)

export default form