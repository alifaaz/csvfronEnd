/* eslint-disable no-undef */
import React,{  Component} from "react";
import toast from "toastr"
import {
    Butt, Ctable, Smodal, InputGroup,Form,
FormGroup } from "../common";
import http from "../../auth/api";
class csv extends Component{
    state ={
        uploading:false,
        uploadSuccess:false,
        file:null,
        fileForm:null,
        partialDocs:[],
        tableHeader: ["Customer", "PartialMatch", "Control"],
        CstomerForm:{
            name:"",
            email:"",
            phone1:"",
            phone2:"",
            disabled:false,
            id:""
        },
        docsToBeSent:[],
        hasError:false
     
    }
    onclickUplod =(e)=>{

        this.refs.fileUploader.click()
    }
    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }
    componentDidCatch(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.log(error,errorInfo)
    }
    fileuplodFire = ()=>{
        this.setState({ uploadSuccess:true,uploading:false})
        http.post("/addCustomer/csv",this.state.fileForm)
        .then(result => {
            toast.success("successflly no Exact|Partial existence all added and indexed")
            this.setState({
                uploadSuccess: false,
                uploading: false,
                file: null,
                fileForm: null,
            })

        })
        .catch(err => {
          if(err.response){
            switch (err.response.status) {
                case 300:
                    toast.error("partial match")
                    this.setState({
                         uploadSuccess: false,
                         uploading: false, 
                         file:null,
                         fileForm:null,
                         partialDocs:err.response.data.docs,
                         })
                      
                    // eslint-disable-next-line no-undef
                    $('.ui.modal.csv')
                        .modal('show')
                        ;

                    break;
                case 500:
                    this.setState({
                        uploadSuccess: false,
                        uploading: false,
                    
                        
                    })
                    toast.error("somthin  went wrong try later")
                    toast.error(err.response.data.msg)
                    break;

                default:
                    toast.error("somthin  went wrong try later hahahah")
                    break;
            }
        }else{
            toast.error("somtin went wrong try again")
              this.setState({
                  uploadSuccess: false,
                  uploading: false,
                 
              })

        }

        })
    }


    handleChange = (file) =>{
        console.log(file)
        if(file){

            if (file.name.indexOf(".csv") == -1 ){
                toast.error("please choose csv file ")
            }
            else if (file.size > 5000000){
            toast.error("please choose csv file less than 10 MB ")
        }else{
            console.log(file)
            const formData = new FormData();
            formData.append("file", file)
            console.log(formData)
            this.setState({
                file: file,
                fileForm:formData,
                uploading:true
            })
            $('#progress').progress();
        }
    }else{
        toast.info("select file again")
    }
    }

    oninputChange = (e) => {

        const { name, value } = e.target

        this.setState(prevState => ({
            CstomerForm: {
                ...prevState.CstomerForm,
                [name]: value
            }
        }))
    }

    editPartialDocs= (e)=>{

        e.preventDefault()
        // let docs = this.state.partialDocs.map(val => {
        //     if()
        // })
        this.setState(state => {
            const prevs = state.partialDocs.map((item, i) => {
                if (item.real._id === state.CstomerForm.id) {

                    item.real.name= state.CstomerForm.name
                    item.real.email = state.CstomerForm.email
                    item.real.phone1 = state.CstomerForm.phone1
                    item.real.phone2 = state.CstomerForm.phone2
                    
                    return item
                } else {
                    return item
                }


            })

            return {
                prevs,
                disable: false,
                CstomerForm: {
                    name: "",
                    email: "",
                    phone1: "",
                    phone2: "",
                    disabled: false,
                    id: ""
                },
            }
        })
    console.log(this.state.partialDocs)
        $('.ui.modal.info')
            .modal('hide')
            ;
        $('.ui.modal.csv')
            .modal('show')

    }

    invokeEditModal = () => {
        $('.ui.modal.info')
            .modal('show')
            ;
    }
    showPartialModal = () => {
        $('.ui.modal.csv')
            .modal('show')
            
    }

    updateEditForm =(doc) => {
        $('.ui.modal.info')
            .modal('show')
            ;
            this.setState({
                CstomerForm: {
                    name: doc.real.name,
                    email: doc.real.email,
                    phone1: doc.real.phone1,
                    phone2: doc.real.phone2,
                    disabled: false,
                    id: doc.real._id
                },
            })
    }
    removeFromPartial = (doc) => {
        const docs = this.state.partialDocs.filter((val) => {
            if (val.real._id !== doc.real._id){
                return val
            }
        })
        console.log(docs)
        this.setState({partialDocs:[...docs]})
        
    }
    addPartialMatch = (doc) => {

        this.setState({
            disable: true
        })
        const data = {name:doc.real.name,email:doc.real.email,phone1:doc.real.phone1,phone2:doc.real.phone2}
        http.post("/addCstomer/partial", { data: [data] })
            .then(() => {
                this.setState({ disable: false})
               
                toast.success("added And indexed new doc")
                this.removeFromPartial(doc)
            })
            .catch(err => {
                toast.error(`error happen ${err.response.data.msg}`)
                this.setState({
                    disable: false
                })

            })
    }

    render(){
        return(
            <div>
                {this.state.hasError?<h1>somthin went wrong </h1>:""}
              <div>
                    {this.state.file ? this.state.file.name:''}
              </div>
                <div className={`ui big button ${this.state.uploadSuccess? "disabled":""}`} onClick={this.onclickUplod}>
                    <i className="upload icon"></i>
                     Select csv file
                     <input id="file-input" 
                     type="file" 
                     name="csv" 
                     onChange={(e) => this.handleChange(e.target.files[0])}
                     ref="fileUploader"
                     accept=".csv"
                     style={{display: "none"}} />
                </div>
                <br />
                <br />
                <br />
                {this.state.uploading ? <Butt 
                    title="upload"
                    clas="ui button teal"
                    disable={!this.state.uploading}
                    clicked={this.fileuplodFire}
                />:''}
                {this.state.uploadSuccess?
                        <div className="ui teal progress" data-percent="60" id="progress">
                            <div className="bar"></div>
                            <div className="label">60% ploading</div>
                        </div>
                    :''
                }
            
                <br/>
                <br/>
                <Butt
                    title="check modal"
                    clas="ui button basic"
                    clicked={this.showPartialModal}
                />

                <Smodal
                    header="Update & SavePartially matches"
                    clas="csv"
                >
                    <Ctable headers={this.state.tableHeader}>

                        {this.state.partialDocs.map((doc,i )=> <tr key={doc.real._id}>
                            <td>

                                {doc.real.name} -{doc.real.email}

                                <br />
                                {doc.real.phone1} - {doc.real.phone2}
                            </td>
                            <td>{doc.partia._source.name} -{doc.partia._source.email} <br />
                                {doc.partia._source.phone1} - {doc.partia._source.phone2}
                            </td>
                            <td>
                                <Butt
                                    title="accept"
                                    clas="ui button teal icon check"
                                    disable={this.state.disable}
                                    clicked={() => this.addPartialMatch(doc)}
                                />
                                <Butt
                                    title="edit"
                                    clas="ui button info icon edit"

                                    clicked={()=> this.updateEditForm(doc)}
                                />
                                <Butt
                                    title="remove"
                                    clas="ui button red icon close"
                                    clicked={()=> this.removeFromPartial(doc)}
                                />
                            </td>
                        </tr>)}
                    </Ctable>
                </Smodal>


              
                <div>
                    <Smodal header="Edit Info" clas="info">
                        <Form
                            onsubmit={this.editPartialDocs}
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
                                    value={this.state.CstomerForm.name}
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
                                    value={this.state.CstomerForm.email}
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
                                            value={this.state.CstomerForm.phone1}
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
                                            value={this.state.CstomerForm.phone2}
                                            onChange={this.oninputChange}


                                        />
                                    </FormGroup>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <Butt

                                    title="editDoc"
                                    clas="btn btn-info ui primary button "
                                    type="submit"
                                    disable={this.state.CstomerForm.disable}

                                />
                            </FormGroup>
                        </Form>
                    </Smodal>

                </div>
            </div>
        )
    }
}


export default csv