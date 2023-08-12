

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {SSHInfo} from "../../API/entity/entity"

export interface SSHInfoOutput {
    sshInfo: SSHInfo,
    output: string,
    selectedIndex: number,
    ID?: number
}

export const sshSlice = createSlice({
    initialState: {
        arr : [] as  SSHInfo[],
        selected : [] as SSHInfo[],
        sshInfoOutput: [] as SSHInfoOutput[]
    }
    ,
    name: "ssh",
    reducers: {
        setOutputFromSHHInfo(state, action : PayloadAction<SSHInfoOutput>) {
            console.log(action);
            if (state.selected.length !=  state.sshInfoOutput.length) {
                state.sshInfoOutput = state.selected.reduce((prev, curr, i) => action.payload.selectedIndex === i ? [...prev, action.payload] : [...prev, {
                    output: "",
                    selectedIndex: i,
                    sshInfo:{ ...curr, index: i}
                } as SSHInfoOutput ], [] as SSHInfoOutput[])
            } else {
                state.sshInfoOutput = state.sshInfoOutput.reduce((prev, curr, i) => action.payload.selectedIndex === i ? [...prev, action.payload] : [...prev, curr], [] as SSHInfoOutput[])
            }
        },
        setSSH(state, action : PayloadAction<SSHInfo[]>) {
            console.log("action", action);
            
            state.arr = [ ...action.payload ]
        },
        setSelectedSSH(state, action : PayloadAction<SSHInfo[]>) {    
            state.selected = [ ...action.payload ]
        },
        addSSH(state, action : PayloadAction<SSHInfo>) {
            state.arr = [...state.arr, action.payload]
        }
    }
})

export const { setSSH, setSelectedSSH, addSSH, setOutputFromSHHInfo } = sshSlice.actions


export const select = {
    getSSH: (state : any) : SSHInfo[] => state.sshs.arr,
    getSelectedSSH: (state : any) : SSHInfo[] => state.sshs.selected,
    getOutput: (state: any ) : SSHInfoOutput[] => state.sshs.sshInfoOutput
}

export const sshReducer = sshSlice.reducer