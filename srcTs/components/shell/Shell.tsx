import React, { Dispatch,useState } from "react";
import {  ConnectionBar,  } from "../basic/Button"
import { useDispatch, useSelector } from "react-redux";
import {  } from "../../store/sshSlice/sshSlice"
import { sshProtocol, ip, port } from "../../API/serverAdress"
import {  } from "../../API/entity/entity";
import { selectShell, socketMsg,updateOutput, isNextDirElementMap, setIsNextDirElement, setDirElements } from "../../store/shell/shell";
import {  } from "../../API/shell/shell"
import {} from "@testing-library/user-event";
import { ShellSessionComponent } from "./ShellSessionComponent"
import { ConnectionList } from "./ConnectionList"


let websocket: null | WebSocket

const getWebsocket = (dispatch: Dispatch<any>) => {
    // throw new Error("xterm will use this socket ./components/shell/Shell.tsx line 17")
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
        if (isNextDirElementMap.get(smsg.id) ? isNextDirElementMap.get(smsg.id)?.msg : false ) {
            dispatch(setIsNextDirElement({
                id: smsg.id,
                msg: false
            }))
            dispatch(setDirElements({
                id: smsg.id,
                msg: smsg.msg.split("\n")
            }))

        } else{
            dispatch(updateOutput(smsg))
        }
    }

    console.log("test");

    websocket = socket
    return websocket
}


export function Shell() {
    const dispatch = useDispatch()
    const socket = getWebsocket(dispatch)

    const sessions = useSelector(selectShell.getSessions)

    return (<_Shell socket={socket}></_Shell>)
}


function _Shell(props: {
    socket: WebSocket
}) {
    const sessions = useSelector(selectShell.getSessions)

    const [selectedTab, setSelectedTab] = useState<number>(0)

    const handleSelection = (id: number) => {
        console.log(id);

        setSelectedTab(id)
    }

    return (
        <>
            <ConnectionBar 
            sshInfos={sessions.map(ele => ele.sshInfo)} setSelectedIndex={selectedTab}
                handleOutput={function (index: number) { }}

                handleNewConnection={() => undefined}
                handleSelection={handleSelection}></ConnectionBar>
            {
                selectedTab === sessions.length ? <ConnectionList></ConnectionList> : <ShellSessionComponent shellSession={sessions[selectedTab]} socket={props.socket}></ShellSessionComponent>
            }
        </>
    )
}





