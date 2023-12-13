export const INCREMENET_COUNTER = "INCREMENET_COUNTER";
export const DECREMENET_COUNTER = "DECREMENET_COUNTER";

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (Yet Another Redux Counter)'
}

interface CounterAction {
    type: string,
    payload: number
}

//Below 2 functions are called Action Creators.
//Instead of just dispatching the Type of action in ContactPage.
//We can also pass on arguments,
//Using these arguments (payload), our reducer functions will perform that action.

export function increment(amount = 1){
    return {
        type: INCREMENET_COUNTER,
        payload: amount
    }
}

export function decrement(amount = 1){
    return {
        type: DECREMENET_COUNTER,
        payload: amount
    }
}

export default function counterReducer(state = initialState, action: CounterAction) {
    switch (action.type) {
        case INCREMENET_COUNTER:
            //return state.data + 1 //This is not allowed, this is called mutating the state
            return {
                ...state,
                data: state.data + action.payload // In this way, we replaced an existing property with a new one
            }

        case DECREMENET_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            }

        default:
            return state;
    }
}