import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Command, SSHAction } from "../../API/entity/entity";


const initialState = {
    actions: {} as  {[key: string]: Command[]}
}


export const sshActionFlowSlice = createSlice({
    initialState: initialState, 
    reducers: {
        setSSHActionFlow(state, action : PayloadAction< {[key: string]: Command[]}>) {    
            state.actions = action.payload
        },
        addSSHActionFlow(state, action : PayloadAction< {[key: string]: Command[]}>) {    
            console.log(action.payload);
            
            state.actions = {
                ...state.actions,
                ...action.payload
            }
        }
    },
    name: "sshActionFlow"
})

export const { setSSHActionFlow, addSSHActionFlow } =  sshActionFlowSlice.actions

export const sshActionFlowReducer =  sshActionFlowSlice.reducer

export const selectSSHActionFlow = { 
    getAction: (state : any) : {[key: string]: Command[]} => state.sshActionFlow.actions 
}
