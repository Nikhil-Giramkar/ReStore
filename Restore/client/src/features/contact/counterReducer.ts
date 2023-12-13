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

export default function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case INCREMENET_COUNTER:
            //return state.data + 1 //This is not allowed, this is called mutating the state
            return {
                ...state,
                data: state.data + 1 // In this way, we replaced an existing property with a new one
            }

        case DECREMENET_COUNTER:
            return {
                ...state,
                data: state.data - 1
            }

        default:
            return state;
    }
}