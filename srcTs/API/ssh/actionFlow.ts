import { PayloadAction } from "@reduxjs/toolkit";
import { User, SSHInfo, Command, SSHCommand, SSHRemoteCopy, SSHAction } from "../entity/entity"
import { getUrl } from "../serverAdress"
import { initState } from "../login/login";
import { setSSHActionFlow } from "../../store/sshSlice/sshActionFlowSlice";


interface ActionFlowStruct {
    ActionFlow_uuid: string,
    ActionName: string,
    User_Id: number,
    Index: number,
    Command: string,
    Action: string,
    Target: string,
    Source_Dir: string,
    Destination_Dir: string,
    UUID: string
}

function parseToCommand(actionflowStruct: ActionFlowStruct[]): Map<string, Command[]> {

    return actionflowStruct.reduce((map, cur) => {
        console.log(cur);


        const key = `${cur.ActionName}_${cur.UUID}`

        const cmd: Command = (cur.Action == SSHAction.SSHCommand) ? {
            Action: cur.Action,
            Command: cur.Command,
            Index: cur.Index,
            Target: cur.Target
        } as SSHCommand
            : {
                Action: cur.Action,
                Index: cur.Index,
                Target: cur.Target,
                Destination_Dir: cur.Destination_Dir,
                Source_Dir: cur.Source_Dir
            } as SSHRemoteCopy


        if (map.has(key))
            map.get(key)?.push(cmd)
        else {
            map.set(key, [cmd])
        }

        return map
    }, new Map<string, Command[]>)


}


export const actionFlowGetAll = async (user: User): Promise<Map<string, Command[]>> => {
    const url = getUrl + "/ssh/actionFlow/getAll"
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(`${user.Name}:${user.Password}`)
            },
        })

        const json = await res.json()

        console.log(json);

        const ele = parseToCommand(json)

        return ele
    } catch (error) {
        console.log("this is a issue")
        throw new Error("Failed to connect");
    }
}


export const actionFlowSave = async (user: User, sshInfos: SSHInfo[], commands: Command[], actionName: string): Promise<Response> => {
    const url = getUrl + "/ssh/actionFlow/create"

    const merge = {
        sshInfos,
        ...user,
        commands,
        ActionName: actionName
    }


    try {
        return fetch(url, {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(`${user.Name}:${user.Password}`)
            },
            body: JSON.stringify(merge)
        })
    } catch (error) {
        console.log("this is a issue")
        throw new Error("Failed to connect");
    }
}


export const actionFlowDelete = async (user: User, command: Command, dispatch?: (action: PayloadAction<any>) => void): Promise<Response> => {
    const url = getUrl + "/ssh/actionFlow/delete"

    try {
        if (command.UUID === undefined) {
            throw new Error("no able to get uuid")
        }
        let res = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(`${user.Name}:${user.Password}`)
            },
            body: JSON.stringify({ UUID: command.UUID })
        })

        if (dispatch != undefined) {
            const actionFlows = await actionFlowGetAll(user)
            let obj: { [key: string]: Command[] } = {}
            actionFlows.forEach((val, key) => {
                obj[key.split("_")[0]] = val.map(ele => ({...ele, UUID: key.split("_")[1]}) )
            })
            console.log("debug for actionflow set");
            
            dispatch(setSSHActionFlow(obj))
        }

        return res
    } catch (error) {
        console.log("this is a issue")
        throw new Error("Failed to connect");
    }
}