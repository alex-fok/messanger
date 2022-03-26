import { useEffect } from 'react'
import io from 'socket.io-client'
import type { Socket } from 'socket.io-client'

let socket:Socket

const createSocket = (jwt:string) => {
  socket = io({query:{token:jwt}})
  return socket
}
const useSocket = (event:string, cb:(...args:any[])=>void):Socket => {
  useEffect(() => {
    socket.on(event, cb)
    return () => { socket.off(event, cb) }
  }, [event, cb])
  return socket
}
export { createSocket }
export default useSocket
