import { Socket, Server } from 'socket.io'
import Chat from '../../../lib/db/chat'
import { ObjectId } from 'mongodb'

import type { User, EventHandlers } from '../../../types/socket/server'

const getEvents = (socket:Socket, io: Server, user:User):EventHandlers[] => [
  {
    event: 'createChat',
    handler: async(tmpId:string, participants:string[], message:string) => {
      const copy = participants.slice()
      if (!copy.includes(user.username)) copy.push(user.username)
      const chatResult = await Chat.create(new ObjectId(user.id), copy, message).catch(err => {console.error(err)})
      if (!chatResult) return socket.emit('error', 'Unable to create chat')
      const chatId = chatResult.chatId.toString()
      chatResult.participantIds.forEach(p => {
        const pString = p.toString()
        const emitter = pString === user.id ? socket : io
        emitter.to(`user_${pString}`).emit('newChat', chatId, chatId, participants)
        io.in(`user_${pString}`).socketsJoin(`chat_${chatId}`)
      })
      socket.emit('createChatRes', tmpId, chatResult.chatId, chatResult.timestamp)
    } 
  },{
    event: 'message',
    handler: async(index:number, chatId:string, message:string) => {
      const timestamp = Date.now()
      const messageInfo = await Chat.addMessage(new ObjectId(user.id), new ObjectId(chatId), message).catch(err => {console.error(err)})
      if (!messageInfo) return socket.emit('error', 'Unable to create message')
      socket.to(`chat_${chatId}`).emit('newMessage', chatId, messageInfo)
      socket.emit('messageRes', index, chatId, timestamp)
    }
  },{
    event: 'getChat',
    handler: async(chatId:string) => {
      const result = await Chat.get(new ObjectId(chatId), new ObjectId(user.id)).catch(err => {console.error(err)})
      if (!result) return socket.emit('error', 'Unable to get chat')
      socket.emit('getChatRes', chatId, result.history, result.participants)
    }
  },{
    event: 'getParticipants',
    handler: async(chatId:string) => {
      const participants = await Chat.getParticipants(new ObjectId(chatId), new ObjectId(user.id)).catch(err => {console.error(err)})
      if (!participants) return socket.emit('error', 'Unable to get participants')
      socket.emit('getParticipantsRes', chatId, participants)
    }
  },{
    event: 'removeUser',
    handler: async(chatId:string) => {
      const result = await Chat.removeUser(new ObjectId(chatId), new ObjectId(user.id))
      socket.to(`user_${user.id}`).emit('userRemoved', chatId)
      socket.emit('removeUserRes', result)
    }
  },{
    event: 'removeChat',
    handler: async(chatId:string) => {
      const result = await Chat.removeChat(new ObjectId(chatId), new ObjectId(user.id))
      result.participants.forEach((p) => {
        const emitter = p.equals(user.id) ? socket : io
        emitter.to(`user_${p.toString()}`).emit('chatRemoved', result.chatId)
      })
      socket.emit('removeChatRes', result.acknowledged)
    }
  }
]

export default getEvents
