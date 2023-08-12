import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import {User} from "../../API/entity/entity"

export const userSlice = createSlice({
       initialState: {
            Name: "",
            Password: "",
            Email: ""
       }as User,
       name: "user",
       reducers: {
            setUser (state, action : PayloadAction<User> )  {
                console.log(action);   
                state.Name = action.payload.Name
                state.Password = action.payload.Password
                state.Email = action.payload.Email ?? ""
            }
       }
    })


export const {setUser} = userSlice.actions
export const select = {
    getUser: (state : any) : User => state.user
}

export const userReducer =  userSlice.reducer