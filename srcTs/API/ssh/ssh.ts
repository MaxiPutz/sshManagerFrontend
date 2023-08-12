import {SSHInfo, User} from "../entity/entity"
import { ip, port, getUrl } from "../serverAdress";

export const create = async (ssHInfo : SSHInfo, user : User, encrypFunc : (user : User, sshInfo : SSHInfo) => SSHInfo) : Promise<Response> => {
    const url = getUrl+  `/ssh/create`
    console.log(JSON.stringify(ssHInfo));
    
    try {
        return fetch(url, {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(`${user.Name}:${user.Password}`)
            },
            body: JSON.stringify( encrypFunc(user, ssHInfo))
        })
    } catch (error) {
        console.log("this is a issue")
        throw new Error("Failed to create");
    }
}

export const getAll = async ( user : User, decrypFunc : (user : User, sshInfo : SSHInfo) => SSHInfo) : Promise<SSHInfo[]> => {
    const url = getUrl+  `/ssh/get`
    
    try {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(`${user.Name}:${user.Password}`)
            }
        })

        console.log("getAll", res);
        
        const json : SSHInfo[] = await res.json() 
        console.log("getAll json", json);
        

        return json.map(ele => decrypFunc(user, ele))
    } catch (error) {
        console.log("this is a issue")
        throw new Error("Failed to create");
    }
}

export const checkConnection =async (ssHInfo : SSHInfo, user : User) : Promise<Response> => {
    const url = getUrl + "/ssh/checkConnection"

    console.log(JSON.stringify(ssHInfo));
    console.log(url);
    
    try {
        return fetch(url, {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(`${user.Name}:${user.Password}`)
            },
            body: JSON.stringify(ssHInfo)
        })
    } catch (error) {
        console.log("this is a issue")
        throw new Error("Failed to connect");
    }
}



export const deleteSsh = async (user : User, sshInfo : SSHInfo) : Promise<Response> => {
    const url = getUrl+  "/ssh/delete"

    console.log("delete", sshInfo);
    
    const id = sshInfo.ID
    try {
        return fetch(url, {
            method: "POST",
            headers: {
                'Authorization': 'Basic ' + btoa(`${user.Name}:${user.Password}`)
            },
            body: JSON.stringify({
                ID: id?.toString()
            } )
        })
    } catch (error) {
        console.log("this is a issue")
        throw new Error("Failed to create");
    }
}