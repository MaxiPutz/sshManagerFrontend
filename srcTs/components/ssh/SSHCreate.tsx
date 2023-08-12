import React, { useRef } from "react"
import { SSHInfo, User } from "../../API/entity/entity"
import { checkConnection, create } from "../../API/ssh/ssh"
import { useDispatch, useSelector } from "react-redux"
import { select } from "../../store/userSlice/userSlice"
import { encrypt, decrypt } from "../../Security/Security"
import { Button, Label, TextField } from "../basic/Button"
import { selectGlobal, setIsLock } from "../../store/global/isLockSlice"
import { addSSH, setSSH } from "../../store/sshSlice/sshSlice"

export function SSHCreate(): JSX.Element {
    const isLock = useSelector(selectGlobal.getIslook)// todo

    const userData: User = useSelector(select.getUser)

    const dispatch = useDispatch()


    const ipRef = useRef<HTMLInputElement>(null)
    const pwRef = useRef<HTMLInputElement>(null)
    const userRef = useRef<HTMLInputElement>(null)
    const keyRef = useRef<HTMLInputElement>(null)

    const getSSHInfoFromInput = (): SSHInfo | undefined => {
        const ip = ipRef.current!.value
        const pw = pwRef.current!.value
        const user = userRef.current!.value
        const key = keyRef.current!.value

        if (ip == "" || pw == "" || user == "" || user == "") {
            alert("some filed is not filled")
            return
        }

        const ssh: SSHInfo = {
            IPAddress: ip,
            Key: key,
            Password: pw,
            User: user
        }

        return ssh
    }

    const handleConnection = async () => {
        console.log("userData", userData);

        const info = getSSHInfoFromInput()
        console.log("userData", userData);

        if (info == undefined) {
            return
        }

        try {
            dispatch(setIsLock(true))
            const res = await checkConnection(info, userData)
            console.log(res)
            const j = await res.json()
            console.log(j);
            alert("connection works")
            dispatch(setIsLock(false))
        } catch (error) {
            alert("fail to connect try check the connection to the ssh server")
            dispatch(setIsLock(false))
        }

    }

    const handleSave = async () => {
        const info = getSSHInfoFromInput()
        if (info == undefined) {
            return
        }

        try {
            dispatch(setIsLock(true))

            const res = await create(info, userData, encrypt)
            console.log("clear", res)
            const j: SSHInfo & {ID:number} = await res.json()
            console.log("clear", j);
            
            dispatch(setIsLock(false))
            dispatch(addSSH({
                ...info,
                ID: j.ID
            }))
        } catch (error) {
            alert("faild to create try again")
            dispatch(setIsLock(false))
        }

    }






    return (
        <div className="w-full flex justify-center">
            <div className="flex w-3/5 items-center">
                <div className="grid w-full">
                    <h1 className="text-3xl font-bold">Create SSH</h1>

                    <div className="relative">
                        <TextField inputRef={ipRef} isLock={isLock}></TextField>
                        <Label>IP Address: </Label>
                    </div>

                    <div className="relative">
                        <TextField inputRef={pwRef} isLock={isLock}></TextField>
                        <Label>password: </Label>
                    </div>

                    <div className="relative">
                        <TextField inputRef={userRef} isLock={isLock}></TextField>
                        <Label>user: </Label>
                    </div>

                    <div className="relative">
                        <TextField inputRef={keyRef} isLock={isLock} onChange={(e) => console.log(e)} onKeyDown={(e) => console.log(e)}></TextField>
                        <Label> key:  </Label>
                    </div>

                    <div className="mt-2 flex justify-center">
                        <Button className="w-2/3" onClick={handleConnection} isLock={isLock} >check connection</Button>
                    </div>
                    <div className="mt-2 flex justify-center">
                        <Button className="w-2/3" isLock={isLock} onClick={handleSave} >save in db</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}