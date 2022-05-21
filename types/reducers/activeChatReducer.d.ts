import { Message } from '../global'
export type ActiveChat = {
  id: string,
  history: Message[],
  tmpId?: string
}

export type ChatAction = {
  type: 'switchActive',
  chatId: string
} | {
  type: 'addMsg',
  message: string,
  user: string
} | {
  type: 'addChat',
  participants: string[]
} | {
  type: 'createMsg',
  chatId: string,
  index: number,
  timestamp: number
} | {
  type: 'createChat',
  chatId: string,
  tmpId: string,
  timestamp: number
} | {
  type: 'addParticipants',
  chatId: string
} | {
  type: 'renewChat',
  chatId: string,
  history: Message[]
} | {
  type: 'newMsg',
  chatId: string,
  message: Message
} | {
  type: 'deselect',
  chatId: string
}
