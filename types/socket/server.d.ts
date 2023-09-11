export type { User } from 'types/global'

export type EventHandlers = {
  event: 'createChat',
  handler: (tmpId:string, participants:string[], message:string) => void
} | {
  event: 'message',
  handler: (index:number, chatId:string, message:string) => void
} | {
  event: 'getChat',
  handler: (chatId:string) => void
} | {
  event: 'getParticipants',
  handler: (chatId:string) => void
} | {
  event: 'removeUser',
  handler: (chatId:string) => void
} | {
  event: 'removeChat',
  handler: (chatId:string) => void
}
