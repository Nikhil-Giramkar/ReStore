import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/User";
import agent from "../../app/api/agent";
import { FieldValues } from "react-hook-form";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/basketSlice";

interface AccountState{
    user: User | null;

}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try{
            const userDto = await agent.Account.login(data);
            const {basket, ...user} = userDto;

            if(basket)
                thunkAPI.dispatch(setBasket(basket)); //Set Basket when user info is retrieved
            
            //We need to persist the token received. Since, if our browser gets refreshed, all components are re-initialised
            //And we may loose the token.
            //For basket, we earlier used Cookie, now we'll use localstorage to store User object
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        //Setting the current user in store, if we have it in local storage
        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user')!)));

        try{
            const userDto = await agent.Account.currentUser();
            const {basket, ...user} = userDto;

            if(basket)
                thunkAPI.dispatch(setBasket(basket)); //Set Basket when user info is retrieved

            //We need to persist the token received. Since, if our browser gets refreshed, all components are re-initialised
            //And we may loose the token.
            //For basket, we earlier used Cookie, now we'll use localstorage to store User object
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch(error: any){
            return thunkAPI.rejectWithValue({error: error.data})
        }
    },
    {
        condition: () =>{
            //this will avoid calling getCurrentUser from backend if we do not have the token in localstorage
            if(!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signOut: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/')
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            //If by any chance, the token in localstorage is tampered/changed
            //We should not stay logged in, hence, if request is rejected from backend,
            //Remove that token from localstorage and ask user to login again for a new good token
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session Expired - Please Login Again');
            router.navigate('/');
        })
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),(state, action) => {
                                state.user = action.payload;
        });

        builder.addMatcher(isAnyOf(signInUser.rejected), (_state, action) => {
            console.log(action.payload);
        });
    })
})

export const {signOut, setUser} = accountSlice.actions;
    

