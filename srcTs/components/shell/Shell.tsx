import React, { useEffect, useRef, useState } from "react";
import { Button, ConnectionBar, TextField } from "../basic/Button"
import { useDispatch, useSelector } from "react-redux";
import { select } from "../../store/sshSlice/sshSlice"
import { getUrl, sshProtocol, ip, port } from "../../API/serverAdress"
import { SSHInfo } from "../../API/entity/entity";
import { ShellSession, selectShell, setShellSession, socketMsg, updateOutput, setSessionShellOutput } from "../../store/shell/shell";
import { newConnection } from "../../API/shell/shell"
import userEvent from "@testing-library/user-event";




export function Shell() {
    const socket = new WebSocket(sshProtocol + "://" + ip + ":" + port + "/sshShell/socket")
    const dispatch = useDispatch()

    const sessions = useSelector(selectShell.getSessions)



    socket.onopen = () => {
        console.log("connection is ssh is open");
    }



    socket.onmessage = (_msg) => {
        const smsg = JSON.parse(_msg.data) as socketMsg
        console.log(smsg);
        dispatch(updateOutput(smsg))
    }


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
            <ConnectionBar sshInfos={sessions.map(ele => ele.sshInfo)} setSelectedIndex={selectedTab}
                handleOutput={function (index: number) { }}

                handleNewConnection={() => undefined}
                handleSelection={handleSelection}></ConnectionBar>
            {
                selectedTab === sessions.length ? <ConnectionList></ConnectionList> : <ShellSessionComponent shellSession={sessions[selectedTab]} socket={props.socket}></ShellSessionComponent>
            }
        </>
    )
}


function ShellSessionComponent(props: {
    shellSession: ShellSession
    socket: WebSocket
}) {
    const inputRef = useRef<HTMLInputElement>(null)

    const outputLength = props.shellSession.output.length
    const lastOutput = props.shellSession.output[outputLength - 1]
    const pwd = lastOutput.split("\n")[lastOutput.split("\n").length - 2] ?? lastOutput
    const shellOutput = props.shellSession.output.map((ele, index) => index !== outputLength - 1 ? ele : replaceLast(ele, pwd))


    const dispatch = useDispatch()

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            shellOutput.push(`${pwd}: ${inputRef.current?.value ?? ""}\n`)

            const newShellSession = {
                ...props.shellSession,
                output: shellOutput
            } as ShellSession

            dispatch(setSessionShellOutput(newShellSession))

            props.socket.send(`${props.shellSession.UUID},${inputRef.current?.value ?? ""}`)
        }
    }


    useEffect(() => {

    }, [props.shellSession.output])


    return (
        <>
            <div className="fixed overflow-scroll h-5/6 flex flex-col-reverse m-5 w-full">
                <ul>
                    <li>
                        <pre className=" ">
                            {shellOutput}
                        </pre>
                    </li>
                    <li>
                        <div className="bg-white rounded-lg shadow m-11 dark:bg-gray-800 p-2">
                            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">

                                <li>
                                    <pre>
                                        {
                                            pwd
                                        }: 
                                    </pre>
                                </li>
                                <li className="w-3/5">
                                    <TextField  isLock={false} onKeyDown={onKeyDown} inputRef={inputRef}></TextField>
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>
            </div>
           
        </>
    )
}


function ConnectionList() {
    const sshInfos = useSelector(select.getSSH)
    const sessions = useSelector(selectShell.getSessions)

    const dispatch = useDispatch()

    const handleNewConnection = (sshInfo: SSHInfo) => {

        const id = generateUUID()

        newConnection(sshInfo, id)

        dispatch(
            setShellSession([...sessions, {
                output: [""],
                sshInfo,
                UUID: id
            } as ShellSession]))
    }

    return (
        <>
            {
                sshInfos.map((ele, index) => (
                    <div className="">
                        <div className="grid grid-cols-2 gap-6" key={index}>
                            <span className="flex justify-end items-center"> {`${ele.User}@${ele.IPAddress}`} </span>
                            <div className="m-4">
                                <Button onClick={() => handleNewConnection(ele)} isLock={false} > Connect </Button>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
}


function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}


function replaceLast(str: string, subStr: string): string {
    const tmp = str.split(subStr);
    if (tmp.length > 1) {
        console.log(subStr);

        console.log(tmp);

        tmp.pop(); // Remove the last element which is after the last occurrence of subStr
        console.log(tmp);

        return tmp.join(subStr);
    }
    return str; // Return original string if subStr not found
}