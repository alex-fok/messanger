import { useEffect } from 'react'
import type { Socket } from 'socket.io-client'

const useSocket = (socket:Socket, event:string, cb:(...args:any[])=>void): void => {
  if (!socket) return
  useEffect(() => {
    socket.on(event, cb)
    return () => { socket.off(event, cb) }
  }, [event, cb])
}
export default useSocket
