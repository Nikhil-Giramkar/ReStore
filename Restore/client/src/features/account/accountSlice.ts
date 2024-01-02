import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/User";
import agent from "../../app/api/agent";
import { FieldValues } from "react-hook-form";

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
    'account/signInUser',
    async (_, thunkAPI) => {
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
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder => {
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled),(state, action) => {
                                state.user = action.payload;
        });

        builder.addMatcher(isAnyOf(signInUser.rejected, fetchCurrentUser.rejected), (_state, action) => {
            console.log(action.payload);
        });
    })

})
    

