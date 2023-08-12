

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {SSHInfo, User, SSHCommand, SSHRemoteCopy, SSHAction, Command, SSHTarget} from "../../API/entity/entity"
import { act } from "react-dom/test-utils";


interface sshExeInfo {
    user: User,
    sshinfos: SSHInfo[],
    command: Command[]
}

interface ActionTypeSetter{
    command: Command,
    sshAction: SSHAction,
    target: SSHTarget
} 

const initCommand : SSHCommand = {
    Action: SSHAction.SSHCommand,
    Command:"",
    Index: 0,
    Target: SSHTarget.Execute
}

const exeInfos : sshExeInfo = {
    command: [initCommand],
    sshinfos: [], 
    user: {
        Name:"",
        Password:"",
        Email: ""
    }
}



export const sshExeSlice = createSlice({
    initialState: {
        exeInfos, // not used maybe later to delete?
    },
    name: "sshExe",
    reducers:  {
        setExeInfos(state, action : PayloadAction<sshExeInfo>) {
            state.exeInfos = {
                ...action.payload
            }
        }, // not used maybe later to delete?
        setActionType(state, action : PayloadAction<ActionTypeSetter>) {
            state.exeInfos.command = state.exeInfos.command.reduce((prev, cur) => {
                cur.Action = cur.Index == action.payload.command.Index ? action.payload.sshAction : cur.Action
                cur.Target = cur.Index == action.payload.command.Index ? action.payload.target : cur.Target

                return [...prev, cur]
            }, [] as Command[])

        },
        addExeInfos(state ,action : PayloadAction<SSHCommand>) {
            console.log(action);
            action.payload.Index = state.exeInfos.command.length
            console.log("huögo");
            
            state.exeInfos = {
                ...state.exeInfos
            }
            state.exeInfos.command = [...state.exeInfos.command, action.payload]
        },
        sshExeRemoveId(state, action : PayloadAction<number>) {
            let removed = 0
            state.exeInfos.command = state.exeInfos.command.reduce((preVal, currVal, index) =>{
                console.log(index);
                if (index === action.payload) {
                    removed ++
                    return [...preVal] 
                }
                currVal.Index =  index -removed
                return [...preVal, currVal]
            }, [] as Command[])

            state.exeInfos = {
                ...state.exeInfos
            }
        },
        sshExeSetCommandId(state, action : PayloadAction<Command>) {
            state.exeInfos.command[action.payload.Index] = action.payload
            state = {
                ...state
            }
        }, 
    }
})

export const { sshExeRemoveId, setExeInfos, addExeInfos, sshExeSetCommandId, setActionType } = sshExeSlice.actions


export const selectSSHExe = {
    getSSHExeInfo: (state: any) : sshExeInfo => state.sshExe.exeInfos
}

export const sshExeReducer = sshExeSlice.reducer