import { Dispatch } from "react"
import type { Message } from '../../../../types/global'

type EventHandlers = {
  event: string,
  handler: (...args:any[]) => void
}
const getEvents = (dispatchActiveChat:Dispatch<any>, dispatchChatList:Dispatch<any>):EventHandlers[] => {
  return [
    {
      event: 'createChatResponse',
      handler: (tmpId:string, chatId:string, timestamp:number) => {
        dispatchChatList({type: 'rename', tmpId, chatId, name: chatId})
        dispatchActiveChat({type: 'createChat', tmpId, chatId, timestamp})
      }
    },
    {
      event: 'messageResponse',
      handler: (index:number, chatId:string, timestamp:number) => {
        dispatchActiveChat({type:'createMsg', index, chatId, timestamp})
      }
    },
    {
      event: 'removeChatResponse',
      handler: (isChatRemoved: boolean) => {
        console.log('Chat removed by user: ', isChatRemoved)
      }
    },
    {
      event: 'getChatResponse',
      handler: (chatId: string, history:Message[], participants: string[]) => {
        if (!history.length) return
        dispatchActiveChat({type:'renewChat', chatId, history, participants})
      }
    },
    {
      event: 'chatRemoved',
      handler: (chatId:string) => {
        dispatchChatList({type: 'deleteChat', chatId})
        dispatchActiveChat({type: 'deselect', chatId})
      }
    },
    {
      event: 'newChat',
      handler: (chatId:string, name:string) => {
        dispatchChatList({type:'newChat', chatId, name})
      }
    },
    {
      event: 'newMessage',
      handler: (chatId:string, message:Message) => {
        dispatchActiveChat({type:'newMsg', chatId, message})
      }
    },
    {
      event: 'userRemoved',
      handler: (userRemoved: boolean) => { console.log('user removed: ', userRemoved) }
    }
  ]
}

export default getEvents
