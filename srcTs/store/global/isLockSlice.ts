import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum routeUris {
    login = "/login",
    register = "/",
    action = "/dashboard",
    sshCreate = "/sshCreate",
    shell = "/shell",
    xtermShell = "/xtermShell"
}

const initialState : {
    isLook: boolean;
    route: routeUris
} = {
    isLook: false,
    route:  routeUris.register
}

export const global = createSlice({
   initialState,
   name: "global",
   reducers: {
        setIsLock(state, action : PayloadAction<boolean>) {
            state.isLook = action.payload
        },
        setRoute(state, action : PayloadAction<routeUris>) {
            state.route = action.payload
        }
   }
})

export const globalReducer = global.reducer

export const {setIsLock, setRoute} = global.actions

export const selectGlobal = {
    getIslook : (state: any) : boolean => state.global.isLook,
    getRoute : (state : any) : routeUris => state.global.route
}