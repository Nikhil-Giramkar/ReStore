import axios, { AxiosError, AxiosResponse } from "axios";
import {toast} from 'react-toastify'
import { router } from "../router/Routes";
import { PaginatedResponse } from "../models/Pagination";
import { store } from "../store/configureStore";

axios.defaults.baseURL = "http://localhost:5000/api/"

axios.defaults.withCredentials = true; //allow passing of cookies

const responseBody = (response : AxiosResponse) => response.data;

const sleep = () => new Promise(resolve => setTimeout(resolve, 500));

//Axios interceptor to manipulate request
axios.interceptors.request.use(config => {
    //send JWT token for authorization of user with every request
    const token = store.getState().account.user?.token;
    if(token)
        config.headers.Authorization = `Bearer ${token}`;
    return config;
})

//Using Axios interceptors to handle errors in response
axios.interceptors.response.use(async response =>{
    await sleep(); //Adding a fake delay to look realistic

    const pagination = response.headers['pagination'];
    if (pagination) {
        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
    }
    return response;
    
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
            router.navigate('/server-error', {state: {error: data}})
            break;
        default:
            break;
    }
    return Promise.reject(error.response) //This helps in directly console logging error instead of using error.response
})

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, requestBody: object) => axios.post(url, requestBody).then(responseBody),
    put: (url: string, requestBody: object) => axios.put(url, requestBody).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody)
}

const Catalog = {
    list: (params: URLSearchParams) => requests.get('products',params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters'),
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error')
}

const Basket = {
    get: () => requests.get('basket'),
    addItem: (productId: number, quantity = 1) => requests.post(`basket?productId=${productId}&quantity=${quantity}`
                                                                ,{}), //we need to send request body, since we will use query strings, request body will be empty
    removeItem: (productId:number, quantity = 1) => requests.delete(`basket?productId=${productId}&quantity=${quantity}`)
    
    //Added quantity=1 as default value, it can obviously be overridden
}

const Account = {
    login: (values: any) => requests.post("account/login", values),
    register: (values: any) => requests.post("account/register", values),
    currentUser: () => requests.get("account/currentUser"),
}

const Orders = {
    list: () => requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}
const agent = {
    Catalog,
    TestErrors,
    Basket,
    Account,
    Orders
}

export default agent;