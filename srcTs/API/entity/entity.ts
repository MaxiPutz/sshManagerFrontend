export interface User {
    Name: string,
    Password: string,
    Email?: string,
  }

export interface SSHInfo {
    IPAddress: string,
    User: string,
    Password: string,
    Key?: string,
    index?: number
    ID?: string
}


export type Command = ( SSHCommand |  SSHRemoteCopy ) & ({UUID?: string})



export enum SSHAction {
  SSHCommand = "SSHCommand" ,
  SSHCopyFileFromRemote = "SSHCopyFileFromRemote",
  SSHCopyFileToRemote =  "SSHCopyFileToRemote"
}

export enum SSHTarget {
  File = "File",
  Folder = "Folder",
  Execute = "Execute"
}

export interface SSHCommand {
  Action: SSHAction,
  Command: string,
  Index: number,
  Target: SSHTarget,
  UUID?: string  
}



export interface SSHRemoteCopy {
  Action: SSHAction,
  Target: SSHTarget,
  Source_Dir:      string,
  Destination_Dir: string,
  Index: number
  UUID?: string  
  
}
