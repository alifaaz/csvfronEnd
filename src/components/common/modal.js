import React from 'react'


const modal = ({title,children,buttonTitle, buttonType}) =>(
    <div>
        <button style={{marginBottom:'20px'}} type="button" className={`btn btn-${(buttonType) ? buttonType :'secondary'}`} data-toggle="modal" data-target="#modal">
            {buttonTitle}
        </button>
<br/>
       <div className="modal fade" id="modal"  role="dialog" aria-labelledby="exampleModalForms" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                   </div>
               </div>
     </div>
    </div>
            
)


export default modal