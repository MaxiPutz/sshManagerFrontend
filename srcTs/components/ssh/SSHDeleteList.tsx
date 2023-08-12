import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { select, setSSH, setSelectedSSH } from "../../store/sshSlice/sshSlice"
import { select as selectUser} from "../../store/userSlice/userSlice"
import { global, selectGlobal, setIsLock } from "../../store/global/isLockSlice"
import {deleteSsh} from "../../API/ssh/ssh" 

import { Button } from "../basic/Button"

export function SSHDeleteList(): JSX.Element {
    const dispatch = useDispatch()
    const sshSelectedList = useSelector(select.getSelectedSSH)
    const sshList = useSelector(select.getSSH)
    const isLocked = useSelector(selectGlobal.getIslook)
    const user = useSelector(selectUser.getUser)

    if (sshSelectedList.length === 0) {
        return <></>
    }

    const delteHandler = () => {

    }

    return (
        <div className="border border-black border-b-2">
            <div className="grid grid-cols-3 border-b-2 border-black gap-3">
                <th>
                    User
                </th>
                <th>
                    IPAddress
                </th>
                <th>
                    Actions
                </th>
            </div>
            {
                sshSelectedList.map((ele, index) => (
                    <div className="grid grid-cols-3 gap-3">
                        <div className="flex justify-center">
                            <div>
                                {ele.User}
                            </div>
                        </div >
                        <div className="flex justify-center">
                            {ele.IPAddress}
                        </div>
                        <Button className="" isLock={isLocked} onClick={async() => {
                            try {
                                dispatch(setIsLock(true))
                                const res = await deleteSsh(user, ele)
                                console.log(res);
                                const json = await res.json()
                                console.log(json);

                                dispatch(setSSH(sshList.filter((e)  => e.ID != ele.ID)))
                                dispatch(setSelectedSSH(sshSelectedList.filter((_,i) => index != i)))
                                dispatch(setIsLock(false))
                            } catch (error) {
                                alert("not able to delete ssh try again")
                                dispatch(setIsLock(false))
                            }
                            
                        }} >Delete</Button>
                    </div>
                ))
            }
            {/* <Button isLock={isLocked} onClick={() => console.log("pfuh")
            }> Delete All</Button> */}
        </div>
    )
}