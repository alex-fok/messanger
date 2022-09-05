import { Server, Socket } from 'socket.io'
import User from '../../lib/db/user'
import getEvents from './events'

const setup = (io: Server) => {
  io.on('connection', async (socket:Socket) => {
    const {token} = socket.handshake.query
    const user = await User.getWithJwt(token as string)
    if (!user)
      return socket.emit('error', 'No user found')
    
    socket.join(`user_${user.id}`)
    Object.keys(user.chats).forEach((chatId:string) => {
      socket.join(`chat_${chatId}`)
    })

    const events = getEvents(socket, io, user)
    events.forEach(({event, handler}) => {
      socket.on(event, handler)
    })
  })
}
export default setup
