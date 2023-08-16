import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { SSHInfo } from "../../API/entity/entity";


export interface ShellSession {
    sshInfo: SSHInfo,
    UUID: string,
    output: string[],
    shellHistory: string[] | undefined,
    dirElements: string[] | undefined
    isNextDirElement: boolean
}


export interface socketMsg {
    msg: string,
    id: string
}

export interface dirElementMsg {
    msg: string[],
    id: string
}

export interface isNextDirElementMsg {
    msg: boolean,
    id: string
}

const initialState = {
    sessions: [] as ShellSession[]
}

export const  isNextDirElementMap: Map<string, isNextDirElementMsg> = new Map()

const shellSlice = createSlice({
    initialState,
    name: "shell",
    reducers: {
        setShellSession(state, action: PayloadAction<ShellSession[]>) {

            state.sessions = [...action.payload]
        },
        updateOutput(state, action: PayloadAction<socketMsg>) {
            const newSessions = state.sessions.reduce((prev, curr) => {
                if (curr.UUID !== action.payload.id) {
                    return [...prev, curr]
                }

                const output = [...curr.output, action.payload.msg]

                if ((output.length > 2) && (curr.shellHistory === undefined)) {
                    curr.shellHistory = output[2].split("\n")
                    output[2] = action.payload.msg.split("\n")[action.payload.msg.split("\n").length - 2]
                }

                return [...prev, {
                    ...curr,
                    output,
                } as ShellSession]

            }, [] as ShellSession[])
            state.sessions = newSessions
        },
        setSessionShellOutput(state, action: PayloadAction<ShellSession>) {
            const newSessions = state.sessions.reduce((prev, curr) => curr.UUID === action.payload.UUID ? [...prev, {
                ...curr,
                output: action.payload.output,
            } as ShellSession] : [...prev, curr], [] as ShellSession[])
            console.log("set session", newSessions);
            state.sessions = newSessions
        },
        addHistory(state, action: PayloadAction<socketMsg>) {
            const newSessions = state.sessions.reduce((prev, curr) => curr.UUID === action.payload.id ? [...prev, {
                ...curr,
                shellHistory: [...curr.shellHistory ?? [], action.payload.msg]
            } as ShellSession] : [...prev, curr], [] as ShellSession[])
            console.log("set session", newSessions);
            state.sessions = newSessions
        },
        setDirElements(state, action: PayloadAction<dirElementMsg>) {
            const newSessions = state.sessions.reduce((prev, curr) => curr.UUID === action.payload.id ? [...prev, {
                ...curr,
                dirElements: action.payload.msg
            } as ShellSession] : [...prev, curr], [] as ShellSession[])
            console.log("set session", newSessions);
            state.sessions = newSessions
        },
        setIsNextDirElement(state, action: PayloadAction<isNextDirElementMsg>) {

            isNextDirElementMap.set(action.payload.id, action.payload)

            const newSessions = state.sessions.reduce((prev, curr) => curr.UUID === action.payload.id ? [...prev, {
                ...curr,
                isNextDirElement: action.payload.msg
            } as ShellSession] : [...prev, curr], [] as ShellSession[])
            console.log("set session", newSessions);
            state.sessions = newSessions
        }
    }
})


export const shellReducer = shellSlice.reducer

export const { setShellSession, updateOutput, setSessionShellOutput, addHistory, setDirElements, setIsNextDirElement } = shellSlice.actions

export const selectShell = {
    getSessions: (state: any): ShellSession[] => state.shell.sessions
}