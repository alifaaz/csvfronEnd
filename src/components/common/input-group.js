import React from 'react'

const input = ({children,clas}) => (
    <div className={`input-group ${clas} `}>
        {children}
    </div>
)

export default input