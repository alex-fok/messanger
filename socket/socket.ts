import { ObjectId } from 'mongodb'
import { Server, Socket } from 'socket.io'
import User from '../lib/db/user'
import Chat from '../lib/db/chat'

type NewChatRequest = {
  participants: string[],
  message: string,
  jwt: string
}

type NewChatResponse = {
  timestamp: number,
  chatId: ObjectId
}

type NewMessage = {
  chatId: string,
  message: string,
  jwt: string
}
type LoadChat = {
  chatId: string,
  joining: boolean
}

const setup = (io: Server) => {

  io.on('connection', async (socket:Socket) => {
    const {token} = socket.handshake.query
    console.log('handshake query token:', token)
    const user = await User.getWithJwt(token as string)
    if (!user)
      return socket.emit('error', 'No user found')
    
    socket.join(`user_${user._id}`)
    const {chats} = user;
    Object.keys(user.chats).forEach((chatId:string) => {
      socket.join(`chat_${chats[chatId]}`)
    })
  
    socket.on('createChat', async(tmpId:string, participants:string[], message:string) => {
      const copy = participants.slice()
      if (!copy.includes(user._id)) copy.push(user._id)
      const chatResult = await Chat.create(new ObjectId(user._id), copy, message).catch(err => {console.error(err)})
      if (!chatResult) return socket.emit('error', 'Unable to create chat')
      copy.forEach(p => {
        const pString = p.toString()
        const emitter = pString === user._id ? socket : io
        emitter.to(`user_${pString}`).emit('newChat', chatResult.chatId, chatResult.chatId.toString())
      })
      const chatName = `chat_${chatResult.chatId.toString()}`
      socket.join(chatName)
      socket.emit('createChatResponse', tmpId, chatResult.chatId, chatResult.timestamp)
    })

    socket.on('message', async(index:number, chatId:string, message:string) => {
      const timestamp = Date.now()
      const messageInfo = await Chat.addMessage(new ObjectId(user._id), new ObjectId(chatId), message).catch(err => {console.error(err)})
      if (!messageInfo) return socket.emit('error', 'Unable to create message')
      socket.to(`chat_${chatId}`).emit('newMessage', messageInfo)
      socket.emit('messageResponse', index, chatId, timestamp)
    })

    socket.on('getChat', async(chatId:string) => {
      console.log('getChat: ', chatId)
      const result = await Chat.get(new ObjectId(chatId), new ObjectId(user._id)).catch(err => {console.error(err)})
      if (!result) return socket.emit('error', 'Unable to get chat')
      socket.emit('getChatResponse', chatId, result)
    })
  })
}
export default setup
