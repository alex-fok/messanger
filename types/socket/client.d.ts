export type { Message } from '../global'
export type { ChatListAction } from '../reducers/chatlistReducer'
export type { ChatAction } from '../reducers/activeChatReducer'

export type EventHandlers = {
  event: 'createChatRes',
  handler: (tmpId:string, chatId:string, timestamp:number) => void
} | {
  event: 'messageRes',
  handler: (index:number, chatId:string, timestamp:number) => void
} | {
  event: 'removeChatRes',
  handler: (isChatRemoved:boolean) => void
} | {
  event: 'getChatRes',
  handler: (chatId:string, history:Message[], participants: string[]) => void
} | {
  event: 'getParticipantsRes',
  handler: (chatId:string, participants:string[]) => void
} | {
  event: 'chatRemoved',
  handler: (chatId:string) => void
} | {
  event: 'newMessage',
  handler: (chatId:string, meesage: Message) => void
} | {
  event: 'userRemoved',
  handler: (userRemoved:boolean) => void
}
