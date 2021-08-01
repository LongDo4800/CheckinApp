import axios from "axios";

let RequestApi ={};

RequestApi = (config) => {
    return axios(config)
    .then((res) => {return res});
    
}
export default RequestApi;