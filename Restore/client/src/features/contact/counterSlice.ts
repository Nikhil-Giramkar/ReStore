import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (Yet Another Redux Counter with Redux Toolkit)'
}

export const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers : {
        increment: (state, action) => {
            state.data += action.payload 
            //You might think, this is mutating the state...
            //But in background, the Toolkit uses Immer library which converts mutating logic into relevant redux code
        },
        decrement: (state, action) => {
            state.data -= action.payload 
        },
    }
})

export const {increment, decrement} = counterSlice.actions;
