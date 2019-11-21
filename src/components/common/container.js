import React from 'react'
import PropType from 'prop-types';
/**
 *  {type}  -fluid, - container 
 */
const container = ({type, children}) => (
    <div className={`container-${type }`}>
         {children}
    </div>
)


container.propTypes = {
    type: PropType.string
}


export default container