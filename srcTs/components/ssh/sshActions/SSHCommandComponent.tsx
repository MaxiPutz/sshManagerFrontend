import { useDispatch, useSelector } from "react-redux"
import { SSHAction, SSHCommand, SSHInfo, SSHTarget, User } from "../../../API/entity/entity"

import { } from "../../../API/ssh/ssh"
import { sshExe } from "../../../API/ssh/exeCute"


import { sshExeRemoveId, sshExeSetCommandId } from "../../../store/sshSlice/sshExeSlice"
import React from "react"
import { select, setOutputFromSHHInfo } from "../../../store/sshSlice/sshSlice"
import { Button, Label, TextField } from "../../basic/Button"
import { selectGlobal } from "../../../store/global/isLockSlice"

export function SSHCommandComponent(props: {
    user: User,
    command: SSHCommand,
    isImmutable: boolean
}): JSX.Element {
    const isLock = useSelector(selectGlobal.getIslook) //to do
    // const [inputVal, setInputVal] = useState<string>("")
    const dispatch = useDispatch()
    const user = props.user

    const sshInfos = useSelector(select.getSelectedSSH)

    const hanldeRunCommand = async (e: React.KeyboardEvent<HTMLInputElement> | { key: string }) => {
        if (e.key === "Enter") {
            if(sshInfos.length===0) {
                alert("no ssh connection is selected try to select a ssh connection")
            } 
            sshInfos.forEach(async (sshInfo, index) => {
                try {
                    console.log(sshInfo.IPAddress);
                    
                    const res = await sshExe(sshInfo, {
                        Action: SSHAction.SSHCommand,
                        Command: props.command.Command,
                        Index: props.command.Index,
                        Target: SSHTarget.Execute
                    },
                        user
                    )
                    console.log(res);

                    const json: string = await res.json()
                    console.log(json);
                    dispatch(setOutputFromSHHInfo({
                        output: json,
                        selectedIndex: index,
                        sshInfo: sshInfo
                    }))
                } catch (error) {
                    alert("can not execute")
                    dispatch(setOutputFromSHHInfo({
                        output: "something went wrong",
                        selectedIndex: index,
                        sshInfo: sshInfo
                    }))
                }
            })


        }
    }

    return (
        <div className="grid-cols-5 grid" >
            <div className="relative col-span-4">
                <TextField value={props.command.Command} isLock={isLock || props.isImmutable}
                    onChange={(e) => {
                        let newVals = e.target.value
                        dispatch(sshExeSetCommandId({
                            Action: SSHAction.SSHCommand,
                            Command: newVals,
                            Index: props.command.Index,
                            Target: SSHTarget.Execute
                        }))
                    }}
                    onKeyDown={(e) => hanldeRunCommand(e)} ></TextField>
                <Label>Remote Command</Label>
            </div>
            {
                !props.isImmutable ?
                    props.command.Index === 0 ? "" : (<Button className="m-2" isLock={isLock} onClick={() => dispatch(sshExeRemoveId(props.command.Index))} >remove</Button>) :
                    (<Button className="m-2" isLock={!props.isImmutable} onClick={() => hanldeRunCommand({ key: "Enter" })} >Run</Button>)
            }
        </div>

    )
}