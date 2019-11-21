import React from 'react'

const input = ({ callback, type, placeholder, name, clas, id, value, required }) => (
    
    <input 
        className={`form-control  ${clas?clas:''}`}
        placeholder={placeholder}
        type={type ? type: 'text'}
        name={name}
        onChange={callback}
        id={id}
        value={value}
        required={required}

    />
    
    
)

export default input