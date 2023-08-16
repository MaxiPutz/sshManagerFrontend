import React, { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import {  TextField } from "../basic/Button"
import { ShellSession, setIsNextDirElement, setSessionShellOutput } from "../../store/shell/shell";
import {Autocomplete} from "./Autocomplete"

export function ShellSessionComponent(props: {
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
        console.log(e.key);
        
        if (e.key == "Enter") {
            shellOutput.push(`${pwd}: ${inputRef.current?.value ?? ""}\n`)

            const newShellSession = {
                ...props.shellSession,
                output: shellOutput
            } as ShellSession

            dispatch(setSessionShellOutput(newShellSession))

            props.socket.send(`${props.shellSession.UUID},${inputRef.current?.value ?? ""}`)
        }
        if (e.key === 'Tab') {
            e.preventDefault();
            console.log(pwd);
            
            const fileName = inputRef.current != undefined ? inputRef.current.value.split(" ")[inputRef.current.value.split(" ").length -1] : ""

            console.log("fileName",fileName);
            
      
            console.log(fileName[0] === "/", fileName[0]);
            
            
            dispatch(setIsNextDirElement({
                id: props.shellSession.UUID,
                msg: true
            }))

            if (fileName[0] === "/") {
                const _pwdArr = fileName.split("/")
                const _fileName = _pwdArr.pop()
                const _pwd = _pwdArr.join("/")

                const emitStr = `${props.shellSession.UUID},find ${_pwd} -maxdepth 1 -name "${_fileName}*"`
                console.log(emitStr);
                
                props.socket.send(emitStr)
            } else {
                const emitStr = `${props.shellSession.UUID},find ${pwd} -maxdepth 1 -name "${fileName}*"`
                console.log("jes /", emitStr);
                
                props.socket.send(emitStr)
            }
            

        }
        if (e.key == 'ArrowUp') {
            
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
                                    <Autocomplete onKeyDown={onKeyDown} histroy={props.shellSession.shellHistory} dirsEntry={props.shellSession.dirElements} inputRef={inputRef} isLooked={false}></Autocomplete>
                                </li>
                            </ul>
                        </div>
                    </li>

                </ul>
            </div>
           
        </>
    )
}


function replaceLast(str: string, subStr: string): string {
    const tmp = str.split(subStr);
    if (tmp.length > 1) {
      
        tmp.pop(); // Remove the last element which is after the last occurrence of subStr

        return tmp.join(subStr);
    }
    return str; // Return original string if subStr not found
}