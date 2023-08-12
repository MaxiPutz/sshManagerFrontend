import {getUrl} from "../../API/serverAdress"
import {SSHCommand, SSHInfo, User} from "../../API/entity/entity"

export const sshExe =async (ssHInfo : SSHInfo, sshExe: SSHCommand, user : User) : Promise<Response> => {
    const url = getUrl + "/ssh/exe"

    console.log(JSON.stringify(ssHInfo));
    console.log(url);
    
    const merge = {
        ...ssHInfo,
        ...sshExe
    }

    console.log(merge);
    

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
