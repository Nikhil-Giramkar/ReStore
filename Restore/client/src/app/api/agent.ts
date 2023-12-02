import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = "http://localhost:5000/api/"

const responseBody = (response : AxiosResponse) => response.data;

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

const agent = {
    Catalog
}

export default agent;