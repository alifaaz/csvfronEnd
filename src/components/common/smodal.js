import React from 'react'


const modal = ({children,header,clas}) => {
    return (
        <div className={`ui modal ${clas}`} >
            <i className="close icon"  ></i>

            <div className="header"  >
               {header}
                 </div>


            <div className=" content"  >
                        {children}
                <div className="ui medium image"  >
                    {/* <div className="description"  >
                    </div> */}
                </div>
               
            </div>
            </div>
    )
}


export default modal