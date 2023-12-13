import { Button, ButtonGroup, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CounterState, DECREMENET_COUNTER, INCREMENET_COUNTER } from "./counterReducer";

export default function ContactPage(){

    const dispatch = useDispatch(); //Used to dispatch actions
    const {data, title} = useSelector((state : CounterState) => state); //useSelector listens to the state and updates them, wherever used (Like event handling in C#)
    //Whenever, data or title is updated in store, it is listened here, React re-renders this component.
    
    return (
        <>
        <Typography variant="h2">
            {title}
        </Typography>

        <Typography variant="h5">
            The data is : {data}
        </Typography>

        <ButtonGroup>
            <Button variant="contained" color="error" onClick={() => dispatch({type: DECREMENET_COUNTER})}>Decrement</Button>
            <Button variant="contained" color="primary" onClick={() => dispatch({type: INCREMENET_COUNTER})}>Increment</Button>
        </ButtonGroup>
        </>
    )
}