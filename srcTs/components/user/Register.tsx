import React, { useRef } from "react"
import { userCreate,  } from "../../API/user/user";
import { Button, Label, TextField } from "../basic/Button";
import { useDispatch, useSelector } from "react-redux";
import { selectGlobal, setIsLock } from "../../store/global/isLockSlice";

export function Register() : JSX.Element {
    const isLock = useSelector(selectGlobal.getIslook) //todo

    const usernameRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const password2Ref = useRef<HTMLInputElement>(null)

    const dispatch = useDispatch()


    const handleRegister = async () => {

        const name = usernameRef.current?.value ?? ""
        const pw = passwordRef.current?.value ?? ""
        const pw2 = password2Ref.current?.value ?? ""

        const email = emailRef.current?.value ?? ""

        if (name == "" || pw == "" || email == "") {
            alert("not all fileds are using")
            return
        } else if (pw !== pw2) {
            alert("Password field are not the same")
            return
        }
    
        try {
            dispatch(setIsLock(true))

            const res = await userCreate({
                Email: email,
                Name: name,
                Password: pw
            })

            console.log(res);
            if (res.ok) {
                alert("user is create")
                const j = await res.json()
                console.log(j);
            } else {
                alert("user exist")
            }
            dispatch(setIsLock(false))
            
        } catch (error) {
            alert("issue with the server")
            dispatch(setIsLock(false))
        }
            
        
       
    }

    return (
        <div className="grid">
            <div  className="text-3xl font-bold" >
                <h1 >Register</h1>
            </div>
            <div className="relative">
                <TextField isLock={isLock} inputRef={usernameRef} ></TextField>
                <Label>Username:</Label>
            </div>
            <div className="relative">
                <TextField isLock={isLock} inputRef={emailRef} ></TextField>
                <Label>Email:</Label>
            </div>
            <div className="relative">
                <TextField isLock={isLock} inputRef={passwordRef} ></TextField>
                <Label>Password:</Label>
            </div>
            <div className="relative">
                <TextField isLock={isLock} inputRef={password2Ref} ></TextField>
                <Label>Password:</Label>
            </div >

            <div className="relative flex justify-center">
                <Button className="w-2/3 mt-3 mb-3" isLock={isLock} onClick={handleRegister}>register</Button>
            </div>

        </div>
    )
}



// function handleRegister ()  {
//     console.log("register");
//     userCreate({
//         Email: "email",
//         Name: "name",
//         Password: "passowrd"
//     })
//     .then(ele => ele.json())
//     .then(ele => console.log(ele))
// }