import { useDispatch, useSelector } from "react-redux"
import { Command, SSHAction, SSHCommand, SSHRemoteCopy, SSHInfo, User, SSHTarget } from "../../../API/entity/entity"

import { } from "../../../API/ssh/ssh"
import { sshExe } from "../../../API/ssh/exeCute"


import { sshExeRemoveId, sshExeSetCommandId } from "../../../store/sshSlice/sshExeSlice"
import React from "react"
import { copyToRemote } from "../../../API/ssh/remoteCopy"
import { select, SSHInfoOutput, setOutputFromSHHInfo } from "../../../store/sshSlice/sshSlice"
import { Button, Label, TextField } from "../../basic/Button"
import { selectGlobal } from "../../../store/global/isLockSlice"

export function SSHCopyFileToRemoteComponent(props: {
    user: User,
    command: Command,
    isImmutable: boolean
}): JSX.Element {
    // const [inputVal, setInputVal] = useState<string>("")
    const isLock = useSelector(selectGlobal.getIslook) // todo 


    const sshInfos = useSelector(select.getSelectedSSH)
    const sshOutput = useSelector(select.getOutput)

    console.log(sshOutput);


    const command: SSHRemoteCopy = props.command.Action == SSHAction.SSHCopyFileToRemote ? props.command as SSHRemoteCopy : {
        Action: SSHAction.SSHCopyFileToRemote,
        Target: SSHTarget.File,
        Destination_Dir: "",
        Index: props.command.Index,
        Source_Dir: ""
    }

    const dispatch = useDispatch()
    const user = props.user


    const sourceHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newSource = e.target.value
        dispatch(sshExeSetCommandId({
            Action: SSHAction.SSHCopyFileToRemote,
            Destination_Dir: command.Destination_Dir,
            Target: SSHTarget.File,
            Index: command.Index,
            Source_Dir: newSource
        }))
    }

    const destinationHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newDestionation = e.target.value
        dispatch(sshExeSetCommandId({
            Action: SSHAction.SSHCopyFileToRemote,
            Destination_Dir: newDestionation,
            Target: SSHTarget.File,
            Index: command.Index,
            Source_Dir: command.Source_Dir
        }))
    }

    const copyHandler = async (e: React.KeyboardEvent<HTMLInputElement> | {key: string}) => {
        if (e.key === "Enter") {
            if(sshInfos.length===0) {
                alert("no ssh connection is selected try to select a ssh connection")
            } 
            sshInfos.forEach(async (sshInfo, i) => {
                try {
                    const res = await copyToRemote(sshInfo, command, user)
                    console.log(res);

                    const json: string = await res.json()
                    console.log(json);

                    console.log(json);
                    dispatch(setOutputFromSHHInfo({
                        output: json,
                        selectedIndex: i,
                        sshInfo: sshInfo
                    }))
                } catch (error) {
                    alert("can not execute")
                    dispatch(setOutputFromSHHInfo({
                        output: "something went wrong",
                        selectedIndex: i,
                        sshInfo: sshInfo
                    }))
                }
            })
        }
    }

    return (
        <div className="grid-cols-5 grid gap-3" >
            <div className="relative col-span-2">
                <TextField value={command.Source_Dir} onChange={sourceHandler} onKeyDown={copyHandler} isLock={(isLock || props.isImmutable)}></TextField>
                <Label>Source</Label>
            </div>
            <div className="relative col-span-2">
                <TextField value={command.Destination_Dir} onChange={destinationHandler} onKeyDown={copyHandler} isLock={isLock || props.isImmutable}></TextField>
                <Label>Destination</Label>
            </div>
            {
            !props.isImmutable ?
             props.command.Index === 0 ? "" : (<Button className="m-2" isLock={isLock} onClick={() => dispatch(sshExeRemoveId(props.command.Index))} >remove</Button>) :
          (<Button className="m-2" isLock={!props.isImmutable} onClick={() => copyHandler({key: "Enter"})} >Run</Button>)
            }

        </div>

    )
}