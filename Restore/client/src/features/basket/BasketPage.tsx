import { useEffect, useState } from "react"
import { Basket } from "../../app/models/Basket";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Typography } from "@mui/material";

export default function BasketPage() {
    const [loading, setLoading] = useState(true);

    const [basket, setBasket] = useState<Basket | null>(null)

    useEffect(() => {
        agent.Basket.get()
            .then(basket => setBasket(basket))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }, []) //No dependency, we will be using cookie to get our basket

    if (loading)
        <LoadingComponent message="Loading Basket...." />

    if (!basket)
        <Typography variant="h3">Your basket is empty</Typography>

    return (
        <>
        <h1>Basket</h1>
        <h3>BuyerId = {basket?.buyerId}</h3>
        </>
    )
}