import { Message } from '../global'
export type ActiveChat = {
  id: string,
  history: Message[],
  participants: string[],
  tmpId?: string,
}

export type ChatAction = {
  type: 'switchActive',
  chatId: string,
} | {
  type: 'addMsg',
  message: string,
  user: string
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
  type: 'createTmp',
  participants: string[],
  tmpId: string
} | {
  type: 'updateChat',
  chatId: string,
  history: Message[],
  participants: string[]
} | {
  type: 'newMsg',
  chatId: string,
  message: Message
} | {
  type: 'deselect',
  chatId: string
}
