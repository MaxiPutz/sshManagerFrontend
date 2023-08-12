import React, { Dispatch, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { select, setSelectedSSH } from "../../store/sshSlice/sshSlice";
import { SSHInfo } from "../../API/entity/entity"


export function ListSSH(): JSX.Element {
    const sshs = useSelector(select.getSSH)

    return (
        <div>
            <div className="text-3xl font-bold">
                <h1>SSH List</h1>
            </div>
            <div>
                <SSHTable elements={sshs} ></SSHTable>
            </div>
        </div>
    )
}



const SSHTable = (props: { elements: SSHInfo[] }): JSX.Element => {

    const elements = props.elements

    const dispatch = useDispatch()

    const [selectedSSHinfo, setSelected] = useState<(boolean | undefined)[]>(new Array(elements.length).fill(false)) // why i can not use new Array(elements.length).fill(false)

    const [selectAll, setSelectAll] = useState<boolean>(false)

    useEffect(() => {
        const tmp =
            elements.reduce((prev, curr, index) => selectedSSHinfo[index] != undefined ? [...prev, selectedSSHinfo[index] as boolean] : [...prev, false], [] as boolean[])
        setSelected(tmp)
        console.log("tmp", tmp);

    }, [props.elements])


    const selectHandler = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        console.log(selectedSSHinfo);

        const newVal = [...selectedSSHinfo]
        console.log(newVal);
        newVal[index] = e.target.checked
        setSelected(newVal)
        const sshs = newVal.reduce((prev, cur, index) => cur ? [...prev, {
            ...elements[index],
            index: index
        } as SSHInfo] : [...prev], [] as SSHInfo[])
        dispatch(setSelectedSSH(sshs))
        setSelectAll(false)
    }

    const selectAllHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectAll(true)
            setSelectedSSH(new Array(elements.length).fill(true))
            let tmp = elements.map( (e, i) => ({...e, index: i}))
            dispatch(setSelectedSSH(tmp))
        } else {
    setSelectAll(false)
    const newVal = [...selectedSSHinfo]
    const sshs = newVal.reduce((prev, cur, index) => [...prev, {
        ...elements[index],
    } as SSHInfo], [] as SSHInfo[])

    dispatch(setSelectedSSH(sshs))
    setSelectAll(false)
}
    }

console.log(selectedSSHinfo);


return (
    <div className="border border-black">

        <div className="grid grid-cols-6" >
            <td className="border-b-2 border-black flex justify-center"><input type="checkbox" name="" id="" checked={selectAll} onChange={selectAllHandler}></input> Select SSH </td>
            <th className="border-b-2 border-black">rowNumber</th>
            <th className="border-b-2 border-black">IP Address</th>
            <th className="border-b-2 border-black">User</th>
            <th className="border-b-2 border-black">Password</th>
            <th className="border-b-2 border-black">Key</th>
            {/* <th>actions</th> */}
        </div>


        {
            elements.map((ele, i) => {
                return (
                    <div key={i}>

                        <div className="grid grid-cols-6" >
                            <td className="justify-self-center"> <input type="checkbox" name="" id="" checked={selectedSSHinfo[i]} onChange={(e) => selectHandler(e, i)} /> </td>
                            <td className="justify-self-center">{i}</td>
                            <td className="justify-self-center">{ele.IPAddress}</td>
                            <td className="justify-self-center">{ele.User}</td>
                            <td className="justify-self-center">{"*********"}</td>
                            <td className="justify-self-center">{"*********" || ''}</td>
                            <td className="justify-self-center">
                                {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-1 rounded" onClick={
                                            () => {
                                                console.log(elements);

                                                // dispatch(setSelectedSSH([elements[i]]))

                                            }
                                        } > exe </button> */}
                            </td>
                        </div>
                    </div>

                )
            })
        }

    </div>
)
} 