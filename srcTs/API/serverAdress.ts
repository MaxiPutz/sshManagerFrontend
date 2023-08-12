const dev = true

export const ip = dev ? "192.168.0.171" : "localhost"
export const port = dev ? "8080" : "8080"
export const protocol = dev ? "http" : "http"
export const sshProtocol = dev ? "ws" : "ws"


export const getUrl = `${protocol}://${ip}:${port}`