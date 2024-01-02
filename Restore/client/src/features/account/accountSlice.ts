import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/User";
import agent from "../../app/api/agent";
import { FieldValues } from "react-hook-form";
import { router } from "../../app/router/Routes";

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
            const user = await agent.Account.login(data);
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
            const user = await agent.Account.currentUser();
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
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),(state, action) => {
                                state.user = action.payload;
        });

        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (_state, action) => {
            console.log(action.payload);
        });
    })
})

export const {signOut, setUser} = accountSlice.actions;
    

