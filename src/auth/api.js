import axios from "axios";


const con = axios.create({
    baseURL: "http://localhost:3030/api"
})


export default con