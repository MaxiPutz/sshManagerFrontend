import React, { Dispatch, useState } from "react"
import { XtermConnectionList } from "./XtermConnectionList"
import { ConnectionBar, } from "../basic/Button"
import { useDispatch, useSelector } from "react-redux"
import { selectXtermShell } from "../../store/shell/xtermShell"
import { ip, port, sshProtocol } from "../../API/serverAdress"
import { socketMsg, updateOutput } from "../../store/shell/xtermShell"
import {XtermShell} from "./XtermShell"

let websocket: undefined | WebSocket
const _getSocket = (dispatch : Dispatch<any>) => {
    if (websocket) {
        return websocket
    }

    const socket = new WebSocket(sshProtocol + "://" + ip + ":" + port + "/sshShell/socket")

    socket.onopen = () => {
        console.log("connection is ssh is open");
    }



    socket.onmessage = (_msg) => {
        const smsg = JSON.parse(_msg.data) as socketMsg
        console.log(smsg);
        dispatch(updateOutput(smsg))
    }

    console.log("test");

    websocket = socket
    return websocket
}

export const getSocket = () => {
    return websocket!
} 


export function XtermContainer() {

    const sessions = useSelector(selectXtermShell.getSessions)
    const dispatch = useDispatch()
    
    const [selectedTab, setSelectedTab] = useState<number>(0)

    _getSocket(dispatch)

    const handleSelection = (id: number) => {
        console.log(id);

        setSelectedTab(id)
    }


    console.log("dere oida");

    return (<>
        <ConnectionBar
            sshInfos={sessions.map(ele => ele.sshInfo)} setSelectedIndex={selectedTab}
            handleOutput={function (index: number) { }}

            handleNewConnection={() => undefined}
            handleSelection={handleSelection}></ConnectionBar>
        {
            selectedTab === sessions.length ? <XtermConnectionList></XtermConnectionList> : <XtermShell uuid={sessions[selectedTab].UUID}></XtermShell>
        }
    </>)
}