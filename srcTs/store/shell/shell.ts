import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SSHInfo } from "../../API/entity/entity";


export interface ShellSession {
    sshInfo: SSHInfo,
    UUID: string,
    output: string[],
}


export interface socketMsg {
    msg: string,
    id: string
}
const initialState = {
    sessions: [] as ShellSession[]
}


const shellSlice = createSlice ({
    initialState,
    name: "shell",
    reducers: {
        setShellSession(state, action: PayloadAction<ShellSession[]>) {
            state.sessions = [...action.payload]
        },
        updateOutput(state, action : PayloadAction<socketMsg>) {
            const newSessions = state.sessions.reduce((prev, curr) => curr.UUID === action.payload.id ? [...prev, {
                ...curr,
                output: [...curr.output, action.payload.msg],
            } as ShellSession] : [...prev, curr], [] as ShellSession[])
            state.sessions = newSessions
        },
        setSessionShellOutput(state, action : PayloadAction<ShellSession>) {
            const newSessions = state.sessions.reduce((prev, curr) => curr.UUID === action.payload.UUID ? [...prev, {
                ...curr,
                output: action.payload.output,
            } as ShellSession] : [...prev, curr], [] as ShellSession[])
            console.log("set session", newSessions);
            
            state.sessions = newSessions
        }
    }
})


export const shellReducer =  shellSlice.reducer

export const { setShellSession, updateOutput, setSessionShellOutput} =  shellSlice.actions

export const selectShell = {
    getSessions : (state : any) : ShellSession[] => state.shell.sessions
}