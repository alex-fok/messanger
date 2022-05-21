import { ObjectId } from 'mongodb'
import { Server, Socket } from 'socket.io'
import User from '../../lib/db/user'
import Chat from '../../lib/db/chat'

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
  
    socket.on('createChat', async(tmpId:string, participants:string[], message:string) => {
      const copy = participants.slice()
      if (!copy.includes(user.id)) copy.push(user.id)
      const chatResult = await Chat.create(new ObjectId(user.id), copy, message).catch(err => {console.error(err)})
      if (!chatResult) return socket.emit('error', 'Unable to create chat')
      const chatId = chatResult.chatId.toString()
      copy.forEach(p => {
        const pString = p.toString()
        const emitter = pString === user.id ? socket : io
        emitter.to(`user_${pString}`).emit('newChat', chatId, chatId)
        io.in(`user_${pString}`).socketsJoin(`chat_${chatId}`)
      })
      socket.emit('createChatResponse', tmpId, chatResult.chatId, chatResult.timestamp)
    })

    socket.on('message', async(index:number, chatId:string, message:string) => {
      const timestamp = Date.now()
      const messageInfo = await Chat.addMessage(new ObjectId(user.id), new ObjectId(chatId), message).catch(err => {console.error(err)})
      if (!messageInfo) return socket.emit('error', 'Unable to create message')
      socket.to(`chat_${chatId}`).emit('newMessage', chatId, messageInfo)
      socket.emit('messageResponse', index, chatId, timestamp)
    })

    socket.on('getChat', async(chatId:string) => {
      const result = await Chat.get(new ObjectId(chatId), new ObjectId(user.id)).catch(err => {console.error(err)})
      if (!result) return socket.emit('error', 'Unable to get chat')
      socket.emit('getChatResponse', chatId, result)
    })
    socket.on('removeUser', async(chatId:string) => {
      const result = await Chat.removeUser(new ObjectId(chatId), new ObjectId(user.id))
      socket.to(`user_${user.id}`).emit('userRemoved', chatId)
      socket.emit('removeUserResponse', result)
    })
    socket.on('removeChat', async(chatId:string) => {
      const result = await Chat.removeChat(new ObjectId(chatId), new ObjectId(user.id))
      result.participants.forEach((p) => {
        const emitter = p.equals(user.id) ? socket : io
        emitter.to(`user_${p.toString()}`).emit('chatRemoved', result.chatId)
      })
      socket.emit('removeChatResponse', result.acknowledged)
    })
  })
}
export default setup
