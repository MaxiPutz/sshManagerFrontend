import React, { useRef, useState } from "react"
import { Command, SSHAction, SSHCommand, SSHRemoteCopy, SSHInfo, User, SSHTarget } from "../../../API/entity/entity"
import { select } from "../../../store/sshSlice/sshSlice"
import { select as selectUser } from "../../../store/userSlice/userSlice"
import { sshExeRemoveId, selectSSHExe, addExeInfos, sshExeSetCommandId, setActionType } from "../../../store/sshSlice/sshExeSlice"

import { useDispatch, useSelector } from "react-redux"

import { SSHCommandComponent } from "./SSHCommandComponent"
import { SSHCopyFileToRemoteComponent } from "./SSHCopyFileToRemoteComponent"
import { SSHCopyFileFromRemoteComponent } from "./SSHCopyFileFromRemoteComponent"

import { actionFlowSave } from "../../../API/ssh/actionFlow"
import { Button, Label, Select, TextField } from "../../basic/Button"
import { selectGlobal, setIsLock } from "../../../store/global/isLockSlice"
import { addSSHActionFlow, setSSHActionFlow } from "../../../store/sshSlice/sshActionFlowSlice"


export function SSHActionComponent(): JSX.Element {
    const saveActionTexFieldRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()

    const sshInfo = useSelector(select.getSelectedSSH)
    const user = useSelector(selectUser.getUser)

    const isLock = useSelector(selectGlobal.getIslook) || user.Name === ""



    const inputExeInfo = useSelector(selectSSHExe.getSSHExeInfo)


    const saveHandler = async () => {
        try {
            dispatch(setIsLock(true))
            const res = await actionFlowSave(user, sshInfo, inputExeInfo.command, saveActionTexFieldRef.current?.value ?? "no Name found") // sshInfo not yet supported
            console.log(res);
            
            const json = await res.json()
            console.log(json);

            alert("saved success")
            dispatch(setIsLock(false))

            dispatch(addSSHActionFlow({
                [saveActionTexFieldRef.current?.value ?? "no Name found"]: json
            }))
        } catch (error) {
            alert("faild to Save")
            dispatch(setIsLock(false))
        }
    }

    return (
        <div>
            <h1 className="font-bold text-3xl"> SSH Action</h1>
            <div>
                <div className="relative">
                    <Label>Action Flow name:</Label>
                    <TextField isLock={isLock} inputRef={saveActionTexFieldRef}></TextField>
                    <div className="flex m-2 justify-center">
                        <Button className="w-2/3" isLock={isLock} onClick={saveHandler}  >save action flow to db</Button>
                    </div>
                </div>
                {
                    inputExeInfo.command.map((command, j) => (
                        <SSHActionWraper isImmutable={false} command={command} user={user} key={j}></SSHActionWraper>
                    ))
                }
                <div className="flex justify-center m-2">
                    <Button className="w-2/3" isLock={isLock} onClick={() => {

                        dispatch(addExeInfos(({ Action: SSHAction.SSHCommand, Target: SSHTarget.Execute, Command: "", Index: 0 })))

                        // setInputExe([...inputExe, true])y
                    }

                    } >add new input</Button>
                </div>
            </div>
        </div>
    )
}

export function SSHActionWraper(props: {
    user: User,
    command: Command,
    isImmutable: boolean
}): JSX.Element {

    let selectedComponent: JSX.Element = <h1>element not found</h1>


    switch (props.command.Action) {
        case SSHAction.SSHCommand:
            const val1 = props.command as SSHCommand
            selectedComponent = <SSHCommandComponent isImmutable={props.isImmutable} command={val1} user={props.user} ></SSHCommandComponent>
            break;
        case SSHAction.SSHCopyFileToRemote:
            const val2 = props.command as SSHCommand
            selectedComponent = <SSHCopyFileToRemoteComponent isImmutable={props.isImmutable}  command={val2} user={props.user} ></SSHCopyFileToRemoteComponent>
            break;
        case SSHAction.SSHCopyFileFromRemote:
            const val3 = props.command as SSHCommand
            selectedComponent = <SSHCopyFileFromRemoteComponent isImmutable={props.isImmutable}  command={val3} user={props.user} ></SSHCopyFileFromRemoteComponent>
            break;
        default:
            return <h1>element not found</h1>
            break;
    }

    return SSHActionContainer(selectedComponent, props.command, props.isImmutable)
}


function SSHActionContainer(selectedActionComponent: JSX.Element, command: Command, isImmutable: boolean) {
    const dispatch = useDispatch()

    const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.value) {
            case SSHAction.SSHCommand:
                dispatch(setActionType({ command: command, sshAction: SSHAction.SSHCommand, target: SSHTarget.Execute }))
                break
            case SSHAction.SSHCopyFileFromRemote:
                dispatch(setActionType({ command: command, sshAction: SSHAction.SSHCopyFileFromRemote, target: SSHTarget.File }))
                break
            case SSHAction.SSHCopyFileToRemote:
                dispatch(setActionType({ command: command, sshAction: SSHAction.SSHCopyFileToRemote, target: SSHTarget.File }))
                break
            default:
                console.log(e.target);

        }

    }

    return (<div className="grid-cols-5 grid gap-4">
        <Select isLook={isImmutable} onChange={handleSelect}>
            <option  selected={SSHAction.SSHCommand === command.Action} value={SSHAction.SSHCommand}>exe</option>
            <option  selected={SSHAction.SSHCopyFileFromRemote === command.Action} value={SSHAction.SSHCopyFileFromRemote}>copy file from  remote</option>
            <option  selected={SSHAction.SSHCopyFileToRemote === command.Action} value={SSHAction.SSHCopyFileToRemote}>copy file to remote</option>
        </Select>
        <div className="col-span-4">
            {selectedActionComponent}
        </div>

    </div>)
}

