import React, { useEffect, useRef } from "react"
import { initState, login } from "../../API/login/login"
import { Command, User } from "../../API/entity/entity"
import { useDispatch, useSelector } from "react-redux"
import { setUser, select } from "../../store/userSlice/userSlice"
import { setSSH, select as selectSSH } from "../../store/sshSlice/sshSlice"

import { getAll } from "../../API/ssh/ssh"
import { actionFlowGetAll } from "../../API/ssh/actionFlow"

import { decrypt } from "../../Security/Security"
import { setSSHActionFlow } from "../../store/sshSlice/sshActionFlowSlice"


import { Button, Label, TextField } from "../basic/Button"
import { selectGlobal, setIsLock } from "../../store/global/isLockSlice"

export function Login(): JSX.Element {
    const isLock: boolean = useSelector(selectGlobal.getIslook) //todo



    const userRef = useRef<HTMLInputElement>(null)
    const pwRef = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()
    const user = useSelector(select.getUser)
    const sshs = useSelector(selectSSH.getSSH)


    const handleLogin = async () => {
        try {
            dispatch(setIsLock(true))
            console.log("userref", userRef.current?.value ?? "no");

            const res = await login({
                Name: userRef.current?.value ?? "",
                Password: pwRef.current?.value ?? "",
            })

            console.log(res);

            const j = await res.json() as User

            initState({
                Name: j.Name,
                Password: pwRef.current?.value,
                Email: j.Email
            } as User, dispatch)

            document.cookie = JSON.stringify({
                user: {
                    Name: j.Name,
                    Password: pwRef.current?.value,
                    Email: j.Email
                } as User
            })

            alert(`user: ${user.Name} is logged in`)
            dispatch(setIsLock(false))

        } catch (error) {
            alert("login faild")
            dispatch(setIsLock(false))

        }


    }

    console.log("isLook", isLock);


    return (
        <div className="grid">
            <div className="grid">
                <h1 className="text-3xl font-bold">Login</h1>
            </div>
            <div className="relative" >
                <TextField inputRef={userRef} isLock={isLock} value="demoUser" ></TextField>
                <Label>Username:</Label>
            </div>

            <div className="relative">
                <TextField inputRef={pwRef} isLock={isLock} value="demoPw" ></TextField>
                <Label>Password:</Label>
            </div>

            <div className="flex w-full justify-center mt-3 mb-3">
                <Button className="w-2/3" isLock={isLock} onClick={handleLogin}>login </Button>
            </div>
        </div>
    )
}
