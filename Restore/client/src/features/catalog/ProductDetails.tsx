import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../app/models/Product";
import axios from "axios";

export default function ProductDetails(){
    const {id} = useParams<{id: string}>();

    const [product, setProduct] = useState<Product | null> (null);
    //We may or may not receive a product from backend hence default value and type is null
    
    const [loading, setLoading] = useState(true); //Loading flag to show that we are fetching data
    

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error))
            .finally(() => setLoading(false)) //Set Loading flag false

    },[id])//Everytime the id changes, fetch the data again

    if(loading) return <h3>Loading...</h3>

    if(!product) return <h3>Product Not Found...</h3>
    
    return (
        <>
        <Typography variant="h2">
            {product.name}
        </Typography>
        </>
    )
}