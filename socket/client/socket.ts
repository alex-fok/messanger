import io from 'socket.io-client'
import type {Socket} from 'socket.io-client'
import useSocket from'./hooks/useSocket'

type EventHandlers = {
  event: string,
  handler: (...args:any[]) => void
}

let socket:Socket 
const setSocket = (jwt:string) => {
  if (socket) return socket
  return (socket = io({query: {token: jwt }}))
}
const getSocket = () => socket

const setSocketEventHandlers = (eventHandlers:EventHandlers[]) => {
  if (!socket) return
  eventHandlers.forEach(({event, handler}) => {
    useSocket(socket, event, handler)
  })
}

export {
  setSocket,
  getSocket,
  setSocketEventHandlers
} 
