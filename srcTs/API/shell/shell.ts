import { SSHInfo } from "../entity/entity"
import { getUrl } from "../serverAdress"



export const newConnection = (sshInfo : SSHInfo, uuid : string) => {
    const url = getUrl + "/sshShell/newConnection"



    fetch(url, { method: "POST", body: JSON.stringify({
        UUID: uuid, 
        IPAddress: sshInfo.IPAddress,
        User: sshInfo.User,
        Password: sshInfo.Password,
        Key: sshInfo.Key
      }) }).then(ele => ele.json()).then(ele => console.log(ele))
} 

