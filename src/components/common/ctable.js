import React, { Component } from 'react'


export default class table extends Component {

    state = {}


       
    render(){
        const {headers,children,clas} = this.props
     return   ( 
         <div>

             <table className={`ui celled table  stackable ${clas}`} id="dataTable">
                 <thead >
                     <tr >
                         {headers.map((head, index) => (
                             <th key={index}>{head}</th>
                         ))}
                     </tr></thead>
                 <tbody >
                     {children}
                 </tbody>
             </table>
         </div>)
        
    }

}

