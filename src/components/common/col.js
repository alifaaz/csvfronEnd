import React from 'react'


const col = ({children, screen,size,clas}) =>(
    
    <div className={`col-${screen}-${size}  ${clas}`}>
        {children}
    </div>
    
)

export default col