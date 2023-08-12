import React, { useEffect, useState } from "react"
import { SSHActionWraper } from "./sshActions/SSHAction"
import { useDispatch, useSelector } from "react-redux"

import { selectSSHActionFlow } from "../../store/sshSlice/sshActionFlowSlice"
import { select } from "../../store/sshSlice/sshSlice"
import { select as selectUser } from "../../store/userSlice/userSlice"
import { Button, Select } from "../basic/Button"
import { actionFlowDelete } from "../../API/ssh/actionFlow"



export function SSHActionFlowListComponent(): JSX.Element {

    const [getIndex, setIndex] = useState<number>(0)

    const dispatch = useDispatch()

    const user = useSelector(selectUser.getUser)
    const sshActionCommandList = useSelector(selectSSHActionFlow.getAction)


    const headers = Object.keys(sshActionCommandList)
    const arr = Object.values(sshActionCommandList)


    if (arr.length == 0) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mt-3 mb-3"> Selected SSH Actionflow </h1>
            <Select onChange={(e) => setIndex(Number(e.target.value))}>
                {
                    headers.map((ele, key) => (
                        <option value={key} key={key}>{ele}</option>
                    ))
                }
            </Select>
            {
                arr[getIndex].map((ele, i) => (
                    <SSHActionWraper isImmutable={true} command={ele} user={user} key={i}></SSHActionWraper>
                ))
            }
            <div className="flex justify-center">
                <Button className="w-3/5 m-3" onClick={function () {
                    const command = arr[getIndex][0]
                    setIndex(0)

                    actionFlowDelete(user, command, dispatch).then(ele => {
  
                        return ele.json()
                    }).then(json => {
                        console.log(json);
                        alert("delete success")
                    }).catch((err) => {
                        console.log(err);
                        alert("cannot delete")
                    })

                }} isLock={false}>Delete Actionflow</Button>
            </div>
        </div>
    )
}