import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispactch, useAppSelector } from "../../app/store/configureStore";
import { decrement, increment } from "./counterSlice";

export default function ContactPage(){

    const dispatch = useAppDispactch(); 
    //useDispatch(); //Used to dispatch actions

    // const data = useSelector((state : CounterState) => state.data); //useSelector listens to the state and updates them, wherever used (Like event handling in C#)
    // const title = useSelector((state : CounterState) => state.title);
    // //Whenever, data or title is updated in store, it is listened here, React re-renders this component.
    
    const {data, title} = useAppSelector(state => state.counter);
    return (
        <>
        <Typography variant="h2">
            {title}
        </Typography>

        <Typography variant="h5">
            The data is : {data}
        </Typography>

        <ButtonGroup>
            <Button variant="contained" color="warning" onClick={() => dispatch(decrement(5))}>Decrement by 5</Button>
            <Button variant="contained" color="error" onClick={() => dispatch(decrement(1))}>Decrement</Button>
            <Button variant="contained" color="primary" onClick={() => dispatch(increment(1))}>Increment</Button>
            <Button variant="contained" color="secondary" onClick={() => dispatch(increment(5))}>Increment by 5</Button>
        </ButtonGroup>
        </>
    )
}