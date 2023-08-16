import { useDispatch, useSelector } from "react-redux"
import { newConnection } from "../../API/shell/shell"
import { select } from "../../store/sshSlice/sshSlice"
import { SSHInfo } from "../../API/entity/entity";
import { ShellSession, selectShell, setShellSession } from "../../store/shell/shell";
import React from "react";
import { Button } from "../basic/Button";



export function ConnectionList() {
    const sshInfos = useSelector(select.getSSH)
    const sessions = useSelector(selectShell.getSessions)

    const dispatch = useDispatch()

    const handleNewConnection = (sshInfo: SSHInfo) => {

        const id = generateUUID()

        newConnection(sshInfo, id)

        dispatch(
            setShellSession([...sessions, {
                shellHistory: undefined,
                output: [""],
                sshInfo,
                UUID: id,
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


