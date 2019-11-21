import React from 'react'


const but = ({ title, clas, type, disable, clicked}) =>(
    <button className={`btn ${clas}`} type={type} disabled={disable} onClick={clicked}>
        {title}
    </button>
)



export default but