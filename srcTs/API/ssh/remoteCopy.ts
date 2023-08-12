import {getUrl} from "../../API/serverAdress"
import {SSHCommand, SSHRemoteCopy, SSHInfo, User} from "../../API/entity/entity"

export const copyFromRemote = async (ssHInfo : SSHInfo, sshAction: SSHRemoteCopy, user : User) : Promise<Response> => {
    const url = getUrl + "/ssh/copyFileFromRemote"

    console.log(user);
    
    console.log(JSON.stringify(ssHInfo));
    console.log(url);

    const merge = {
        ...ssHInfo,
        ...sshAction
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

export const copyToRemote = async (ssHInfo : SSHInfo, sshAction: SSHRemoteCopy, user : User) : Promise<Response> => {
    const url = getUrl + "/ssh/copyFileToRemote"

    console.log(user);
    
    console.log(JSON.stringify(ssHInfo));
    console.log(url);

    const merge = {
        ...ssHInfo,
        ...sshAction
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