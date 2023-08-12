import React, { useEffect, useState } from "react";
import { selectSSHExe } from "../../store/sshSlice/sshExeSlice"
import { useSelector } from "react-redux";
import { select, SSHInfoOutput } from "../../store/sshSlice/sshSlice";
import { SSHInfo } from "../../API/entity/entity";

export function SSHOutput(): JSX.Element {
    const str = useSelector(select.getOutput)
    const sshInfo = useSelector(select.getSelectedSSH)
    const sshInfoOutputs = useSelector(select.getOutput)

    const [output, setOutput] = useState<SSHInfoOutput | undefined>(undefined) 

    useEffect(()=> {
        const tmp = sshInfoOutputs.map(ele => ele).sort((e1, e2) => e2.selectedIndex - e1.selectedIndex)
        console.log(tmp);
        setOutput(tmp[0])
    }, [sshInfoOutputs])

    console.log("sshoutput", str);

    const handleOuptput = (index : number) => {
        setOutput(sshInfoOutputs.find(ele => ele.sshInfo.index! === index))
    }

    return (
        <div >
            <h2 className="font-bold text-3xl">Output</h2>
            <div className="">
                <ul className="bg-gray-50 w-full overflow-hidden">
                    {
                        sshInfo.map((sshInfo: SSHInfo, i) => {
                            return (
                                <li key={"SSHAction" + i} className={"float-left mt-3 pt-3 pl-3 pr-3 " + ( (output?.sshInfo.index === i) ? "bg-white border-t-2" : "" ) }>
                                    <button onClick={()=>handleOuptput(sshInfo.index!)} 
                                    > {sshInfo.User}@{sshInfo.IPAddress}</button></li>
                            )
                        })
                    }
                </ul>
            </div>

                    {
                        output ? output.output : <div></div>
                    }
      
        </div>
    )
}