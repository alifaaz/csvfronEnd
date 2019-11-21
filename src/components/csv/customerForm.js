/* eslint-disable no-undef */
import React, { Component } from 'react'
import { Form, Row, FormGroup,InputGroup ,Butt,Smodal,Ctable} from "../common";
import toast from 'toastr'
import http from "../../auth/api";

class customerForm extends Component {
    state={
        name:"",
        email:"",
        phone1:'',
        phone2:'',
        disable:false,
        modalRef:React.createRef(),
        tableHeader:["Customer","PartialMatch","Control"],
        partialDocs:[]
        
    }
    onsubmitCustomer = (e) => {
        e.preventDefault()
        
        console.log("submit")
        const {name,email,phone1,phone2}=this.state
        if(!name || !email || !phone1){

            toast.error("pls fill the fields")
        }else{
            this.setState({disable:true})
            http.post('/addCustomer',{data:{name,email,phone1,phone2}})
            .then(result => {
                console.log(result)
                toast.success(result)
                toast.success("added new record")
                this.setState({ disable: false, name:"", email:"", phone1:"", phone2:"" })
            })
            .catch(err => {
                console.log(err.response)
                // toast.error(err)
                
                switch (err.response.status) {
                    case 400:
                            this.setState({ disable: false })
                            // this.setState({ disable: false, name: "", email: "", phone1: "", phone2: "" })
                            toast.error("Theres is exact match !!")
                            break;
                            
                            case 500:
                                console.log(err.response)
                                this.setState({ disable: false })
                        // this.setState({ disable: false, name: "", email: "", phone1: "", phone2: "" })
                        toast.error("Theres is error check the log match !!")
                        break;
                    case 300:
                        // eslint-disable-next-line no-undef
                        $('.ui.modal.customwer')
                            .modal('show')
                            ;
                        this.setState({ disable: false, partialDocs:err.response.data.docs})
                        console.log(this.state.partialDocs)
                        // this.setState({ disable: false, name: "", email: "", phone1: "", phone2: "" })
                        toast.error("Theres is partial match")
                        break;

                    default:
                        break;
                }


            })

        }
    }

    addPartialMatch = ()=>{
        const data = {
            name:this.state.name,
            email:this.state.email,
            phone1:this.state.phone1,
            phone2:this.state.phone2
        }
        this.setState({
            disable: true
        })

        http.post("/addCstomer/partial",{data:[data]})
        .then(()=>{
           this.setState({ disable: false, name: "", email: "", phone1: "", phone2: "" })
            $('.ui.modal.customwer')
                .modal('hide')
                ;
            toast.success("added And indexed new doc")
        })
        .catch(err => {
            toast.error(`error happen ${err.response.state}`)
            this.setState({
                disable: false
            })

        })
    }
    showModal =()=> {
        $('.ui.modal.customwer')
            .modal('show')
            ;
    }
    oninputChange = (e) => {
        const { name, value } = e.target
        this.setState({[name]: value})
        // console.log(this.state)
    }
    removeFromPartial = (doc) => {
        const docs = this.state.partialDocs.filter((val) => {
            if (val._id !== doc._id) {
                return val
            }
        })
        console.log(docs)
        this.setState({ partialDocs: [...docs] })

    }

    render(){

        return(
            <div>

          
            <Form 
                onsubmit={this.onsubmitCustomer}
            >   
                <h4 className="ui dividing header">Customer Information</h4>
                <FormGroup>
                    <label htmlFor="name">Customer Name </label>
                    <input 
                        type="text"
                        className="form-control ui input focus"
                        placeholder="name"
                        id="name"
                        name="name"
                        value={this.state.name}
                        onChange={this.oninputChange}
                       
                    />
                    </FormGroup>
                <FormGroup>
                    <label htmlFor="email">Customer Email </label>
                    <input
                        type="email"
                        className="form-control ui input focus"
                        placeholder="Email"
                        id="email"
                        name="email"
                        value={this.state.email}
                        onChange={this.oninputChange}
                       
                    />
                </FormGroup>
                <FormGroup>
                    <label htmlFor="email" className="large">Customer Phone numbers </label>
                    <InputGroup clas=" two fields">
                    <FormGroup>
                          <input
                            type="text"
                            className=" ui input focus "
                            placeholder="phone1"
                            id="email"
                            name="phone1"
                            value={this.state.phone1}
                            onChange={this.oninputChange}
                            
                          />

                    </FormGroup>
                    <FormGroup>

                        <input
                            name="phone2"
                            type="text"
                            className="form-control ui input focus"
                            placeholder="phone2"
                            id="email"
                            value={this.state.phone2}
                            onChange={this.oninputChange}
                              
                               
                        />
                    </FormGroup>
                   </InputGroup> 
                </FormGroup>
                <FormGroup>
                    <Butt
                    
                    title="add new Customer"
                    clas="btn btn-info ui primary button " 
                    type="submit"
                    disable={this.state.disable}
                    
                    />
                </FormGroup>
            </Form>
        
                <Smodal header="Partial Exact" clas="customwer">
                    <Ctable
                        headers={this.state.tableHeader}
                    >
                        {this.state.partialDocs.map(doc => <tr key={doc._id}>
                            <td>{this.state.name} -{this.state.email} <br />
                                {this.state.phone1} - {this.state.phone2}
                            </td>
                            <td>{doc._source.name} -{doc._source.email} <br />
                                {doc._source.phone1} - {doc._source.phone2}
                            </td>
                            <td>
                                <Butt 
                                    title="accept"
                                    clas="ui button teal"
                                    disable={this.state.disable}
                                    clicked={this.addPartialMatch}
                                />
                                <Butt 
                                    title="remove"
                                    clas="ui button red"
                                    
                                    clicked={() => this.removeFromPartial(doc)}
                                />
                              
                            </td>
                        </tr>)}
                    </Ctable>
                </Smodal>
               <br/>
               <br/>
                
                                  <Butt
                    title="check modal"
                    clas="ui button basic"
                    clicked={this.showModal}
                />
        </div>
        )
    }

}

export default customerForm