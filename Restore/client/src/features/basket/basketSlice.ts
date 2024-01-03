import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { Basket } from "../../app/models/Basket";
import agent from "../../app/api/agent";
import { getCookie } from "../../app/util/util";

interface BasketState {
    basket: Basket | null;
    status: string;
}

const initialState : BasketState = {
    basket: null,
    status: 'idle'
}

export const addBasketItemAsync = createAsyncThunk<Basket, {productId: number, quantity?: number}>(
    'basket/addBasketItemAsync',
    async ({productId, quantity = 1}, thunkAPI)=> {
        try{
            return await agent.Basket.addItem(productId, quantity);
        }
        catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const removeBasketItemAsync = createAsyncThunk<void, {productId: number, quantity: number, name? : string}>(
    'basket/removeBasketItemAsync',
    async ({productId, quantity}, thunkAPI)=> {
        try{
            return await agent.Basket.removeItem(productId, quantity);
        }
        catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)


export const fetchBasketAsync = createAsyncThunk<Basket>(
    'basket/fetchBasketAsync',
    async (_, thunkAPI) => {
        try{
            return await agent.Basket.get();
        }
        catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data});
        }
    },
    {
        condition: () => {
            //Make the above request only if we have the buyerId in cookie
            if(!getCookie('buyerId')) return false;
        }
    }
)

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action) => {
            state.basket = action.payload
        },
        clearBasket: (state) => {
            state.basket = null;
        },

        removeItem: (state, action) => {
            const {productId, quantity} = action.payload;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);

            if(itemIndex === -1 || itemIndex === undefined){
                return;
            }

            state.basket!.items[itemIndex].quantity -= quantity;
            if(state.basket?.items[itemIndex].quantity === 0){
                state.basket.items.splice(itemIndex, 1);
            }
        }
    },
    extraReducers: (builder => {
        builder.addCase(addBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingAddItem' + action.meta.arg.productId;
            //To allow loading of specific item, not all items
        });
        builder.addCase(removeBasketItemAsync.pending, (state, action) => {
            state.status = 'pendingRemoveItem' + action.meta.arg.productId + action.meta.arg.name;
        });

        builder.addCase(removeBasketItemAsync.fulfilled, (state, action) => {
            const {productId, quantity} = action.meta.arg;
            const itemIndex = state.basket?.items.findIndex(i => i.productId === productId);

            if(itemIndex === -1 || itemIndex === undefined){
                return;
            }

            state.basket!.items[itemIndex].quantity -= quantity;
            if(state.basket?.items[itemIndex].quantity === 0){
                state.basket.items.splice(itemIndex, 1);
            }
            state.status = 'idle'
        });

        builder.addCase(removeBasketItemAsync.rejected, (state, action) => {
            console.log(action.payload)
            state.status = 'idle'
        });

        builder.addMatcher(isAnyOf(addBasketItemAsync.fulfilled, fetchBasketAsync.fulfilled), (state, action) => {
            state.basket = action.payload;
            state.status = 'idle'
        });

        builder.addMatcher(isAnyOf(addBasketItemAsync.rejected, fetchBasketAsync.rejected), (state, action) => {
            console.log(action.payload)
            state.status = 'idle'
        });


    })
})
export const {setBasket, clearBasket} = basketSlice.actions;
