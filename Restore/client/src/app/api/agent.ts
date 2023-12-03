import axios, { AxiosError, AxiosResponse } from "axios";
import {toast} from 'react-toastify'

axios.defaults.baseURL = "http://localhost:5000/api/"

const responseBody = (response : AxiosResponse) => response.data;

//Using Axios interceptors to handle errors in response
axios.interceptors.response.use(response =>{
    return response; // return the response if promise fulfilled
}, (error: AxiosError) =>{
    
    const {data, status} = error.response as AxiosResponse;
    
    //This will show toas notification.
    switch(status){
        case 400:
            //Handle validation error, as it will also send status 400
            if(data.errors){
                const modelStateErrors: string[] = [];

                for(const key in data.errors){
                    if(data.errors[key]){
                        modelStateErrors.push(data.errors[key])
                    }
                }
                throw modelStateErrors.flat();
            }
            toast.error(data.title);
            break;
        case 401:
            toast.error(data.title);
            break;
        case 404:
            toast.error(data.title);
            break;
        case 500:
            toast.error(data.title);
            break;
        default:
            break;
    }
    return Promise.reject(error.response)
})

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, requestBody: {}) => axios.post(url, requestBody).then(responseBody),
    put: (url: string, requestBody: {}) => axios.put(url, requestBody).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: () => requests.get('products'),
    details: (id: number) => requests.get(`products/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error')
}

const agent = {
    Catalog,
    TestErrors
}

export default agent;