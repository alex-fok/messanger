import { Dispatch } from "react"
import type { EventHandlers, Message, ChatListAction, ChatAction } from 'types/socket/client'

const getEvents = (dispatchActiveChat:Dispatch<ChatAction>, dispatchChatList:Dispatch<ChatListAction>):EventHandlers[] => [
  {
    event: 'createChatRes',
    handler: (tmpId:string, chatId:string, timestamp:number) => {
      dispatchChatList({type: 'reassignId', tmpId, chatId, name: chatId})
      dispatchActiveChat({type: 'createChat', tmpId, chatId, timestamp})
    }
  },{
    event: 'messageRes',
    handler: (index:number, chatId:string, timestamp:number) => {
      dispatchActiveChat({type:'createMsg', index, chatId, timestamp})
    }
  },{
    event: 'removeChatRes',
    handler: (isChatRemoved: boolean) => {
      console.log('Chat removed by user: ', isChatRemoved)
    }
  },{
    event: 'getChatRes',
    handler: (chatId: string, history:Message[], participants: string[]) => {
      if (!history.length) return
      dispatchActiveChat({type:'updateChat', chatId, history, participants})
    }
  },{
    event: 'getParticipantsRes',
    handler: (chatId: string, participants:string[]) => {
      dispatchChatList({type:'updateParticipants', chatId, participants})
    }
  },{
    event: 'chatRemoved',
    handler: (chatId:string) => {
      dispatchChatList({type: 'deleteChat', chatId})
      dispatchActiveChat({type: 'deselect', chatId})
    }
  },{
    event: 'newMessage',
    handler: (chatId:string, message:Message) => {
      dispatchActiveChat({type:'newMsg', chatId, message})
    }
  },{
    event: 'userRemoved',
    handler: (userRemoved: boolean) => { console.log('user removed: ', userRemoved) }
  }
]

export default getEvents
