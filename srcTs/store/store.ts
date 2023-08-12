import { configureStore } from "@reduxjs/toolkit";
import {userReducer}  from "./userSlice/userSlice";
import { sshReducer } from "./sshSlice/sshSlice";
import {sshExeReducer} from "./sshSlice/sshExeSlice"
import {sshActionFlowReducer} from "./sshSlice/sshActionFlowSlice"
import {globalReducer} from "./global/isLockSlice"
import {shellReducer} from "./shell/shell"


export const  store = configureStore ({
    reducer: {
        user: userReducer,
        sshs: sshReducer,
        sshExe: sshExeReducer, //** to be continue */
        sshActionFlow: sshActionFlowReducer,
        shell: shellReducer,
        global: globalReducer
    }
})
