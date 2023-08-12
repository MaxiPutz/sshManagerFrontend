import { PayloadAction } from "@reduxjs/toolkit";
import {Command, User} from "../entity/entity"
import { ip, port } from "../serverAdress";
import { setUser } from "../../store/userSlice/userSlice";
import { getAll } from "../ssh/ssh";
import { decrypt } from "../../Security/Security";
import { setSSH } from "../../store/sshSlice/sshSlice";
import { actionFlowGetAll } from "../ssh/actionFlow";
import { setSSHActionFlow } from "../../store/sshSlice/sshActionFlowSlice";

export const login = async (user: User): Promise<Response> => {
    const url = `http://${ip}:${port}/login`;
  
    try {
      const res = fetch(url, {
        method: "POST",
        body: JSON.stringify({
          Name: user.Name,
          Password: user.Password,
        }),
      });
      return res;
    } catch (error) {
      // Handle other errors, e.g., network issues, etc.
      console.log("this is a issue")
      throw new Error("Failed to login");
    }
  };
  
export const initState = async (user: User, dispatch : (action : PayloadAction<any>)=>any ) : Promise<any>  => {
    try {
      let res :any = await login(user)
      const resUser = await res.json() as User

      dispatch(setUser(user))
      
      const resSSH  = await getAll(user, decrypt)
      console.log("resSSH", resSSH);
      
      dispatch(setSSH(resSSH))

      const actionFlows = await actionFlowGetAll(user)
      let obj: { [key: string]: Command[] } = {}
      actionFlows.forEach((val, key) => {
          obj[key.split("_")[0]] = val.map(ele => ({...ele, UUID: key.split("_")[1]}) )
      })

      dispatch(setSSHActionFlow(obj))

    } catch (error) {
      
    }

    

    return 
}