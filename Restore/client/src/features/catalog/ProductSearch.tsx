import { TextField, debounce } from "@mui/material";
import { useAppDispactch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";
import { useState } from "react";

export default function PrductSearch() {
    const {productParams} = useAppSelector(state => state.catalog);
    const dispatch = useAppDispactch();

    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);

    const debouncedSearch = debounce((event: any) => {
        dispatch(setProductParams({searchTerm: event.target.value}))
    }, 1000); //if there is a delay of 1s or more in typing, we will search in backend

    return (
        <>
            <TextField
                label='Search Products'
                variant='outlined'
                fullWidth
                value={searchTerm || ''}
                onChange={(event: any) => {
                    setSearchTerm(event.target.value); //To set value in textfield for what user types
                    debouncedSearch(event); //Search in Backend
                }}
            />
        </>
    )
}