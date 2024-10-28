const dev = true

export const ip = dev ? "192.168.0.236" : "maximilianputz.at"
export const port = dev ? "8080" : "8081"
export const protocol = dev ? "http" : "http"
export const sshProtocol = dev ? "ws" : "ws"


export const getUrl = `${protocol}://${ip}:${port}`