import { ChatMeta } from '../global'

export type ChatMeta = ChatMeta

export type ChatList = {
  items: Map<string, ChatMeta>
  selected: string
}

export type ChatListAction = {
  type: 'incomingMsg',
  notified: string
} | {
  type: 'deleteChat',
  chatId: string
} | {
  type: 'setActive',
  chatId: string
} | {
  type: 'reassignId',
  tmpId: string,
  chatId: string,
  name: string
} | {
  type: 'updateParticipants',
  chatId: string,
  participants: string[]
} | {
  type: 'addTmpChat',
  tmpId: string,
  participants: string[]
}
