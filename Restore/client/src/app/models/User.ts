import { Basket } from "./Basket";

export interface User {
    email: string;
    token: string;
    basket?: Basket; //optional as user might not have a basket
}