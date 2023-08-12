import React, { Children } from "react";
import { SSHInfo } from "../../API/entity/entity"



export function Button(props: {
    onClick: () => any,
    isLock: boolean,
    children: React.ReactNode,
    className?: string
}): JSX.Element {


    let classNameString = (!props.isLock) ? `bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-1 rounded` : 'bg-gray-400 cursor-not-allowed'
    classNameString = `${props.className ?? ""} ${classNameString}`

    console.log(classNameString);


    return <button className={classNameString}
        disabled={props.isLock}
        onClick={props.onClick}>
        {props.children}

    </button>

}

export function TextField(props: {
    value?: string,
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => any,
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => any
    isLock: boolean,
    inputRef?: React.RefObject<HTMLInputElement>,
    children?: React.ReactNode
    className?: string
}): JSX.Element {

    return <input type="text" disabled={props.isLock} className={props.className ?? "" + " " + "mt-2 block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"} value={props.value} onChange={(props.onChange)} ref={props.inputRef} onKeyDown={props.onKeyDown}></input>
}

export function Select(props: {
    children?: React.ReactNode,
    isLook?: boolean
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => any
}): JSX.Element {
    return <select disabled={props.isLook} onChange={props.onChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">

        {props.children}
    </select>
}

export function Label(props: {
    children: React.ReactNode
}): JSX.Element {
    return (
        <label className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-2 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"> {props.children} </label>
    )
}


export function ConnectionBar(props: {
    sshInfos: SSHInfo[],
    setSelectedIndex: number,
    handleOutput: (index: number) => any,
    handleNewConnection: () => any,
    handleSelection: (index: number)=>any
}): JSX.Element {



    return (
        <>
            <ul className="bg-gray-50 w-full overflow-hidden">
                {props.sshInfos.map((sshInfo, i) => (
                    <li key={"SSHAction" + i} className={"float-left mt-3 pt-3 pl-3 pr-3 " + ((props.setSelectedIndex === i) ? "bg-white border-t-2" : "")}>
                        <button onClick={() => {
                            props.handleSelection(i)
                            props.handleOutput(i)
                        }}
                        > {sshInfo.User}@{sshInfo.IPAddress}</button></li>
                ))}
                <li className={"float-left mt-3 pt-3 pl-3 pr-3 " + ((props.setSelectedIndex === props.sshInfos.length ) ? "bg-white border-t-2" : "")}>
                    <button onClick={() => {
                        props.handleSelection(props.sshInfos.length)
                        props.handleNewConnection()
                    }}
                    > add </button></li>
            </ul>
        </>
    )
}