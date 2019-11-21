import React from 'react'



const modal = ({ title, children,modal }) => (
 

    <div className="modal fade" id={modal} role="dialog" aria-labelledby="exampleModalForms" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    
                        {children}
                   
                </div>
            </div>
        </div>
 

)


export default modal