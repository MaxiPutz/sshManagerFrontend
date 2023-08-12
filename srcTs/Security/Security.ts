import {User, SSHInfo} from "../API/entity/entity"
import { AES, enc } from 'crypto-js';

export const encrypt = (user: User, sshInfo: SSHInfo) : SSHInfo => _encrypt(user, sshInfo, AES.encrypt) 


const _encrypt = (user: User, sshInfo: SSHInfo, encryptFunc: (input: string, key : string) => CryptoJS.lib.CipherParams): SSHInfo => {
    const encryptKey = user.Password;
  
    const sshInfoEncrypt = Object.entries(sshInfo).reduce((acc : any, [key, val]) => {

      val = (val == null ? "undefined" : val).toString()
      
      acc[key] = encryptFunc(val, encryptKey).toString();
      return acc;
    }, {} as SSHInfo);
  
    return sshInfoEncrypt;
  };


export const decrypt = (user: User, sshInfo: SSHInfo) : SSHInfo => _decrypt(user, sshInfo, AES.decrypt) 

const _decrypt = (user: User, sshInfo: SSHInfo, decryptFunc: (input: string, key : string) => CryptoJS.lib.WordArray): SSHInfo => {
    const decryptKey = user.Password;
  
    const sshInfoEncrypt = Object.entries(sshInfo).reduce((acc : any, [key, val]) => {
      val = (val == null ? "undefined" : val).toString()
      
      if (key === "ID") {
        acc.ID = val
        return acc
      }
      
      try {
        acc[key] = decryptFunc(val, decryptKey).toString(enc.Utf8);
        return acc;
      } catch (error) {
        return acc;
      }
      acc[key] = decryptFunc(val, decryptKey).toString(enc.Utf8);
      console.log(acc);
      
      return acc;
    }, {} as SSHInfo);
  
    return sshInfoEncrypt;
  };