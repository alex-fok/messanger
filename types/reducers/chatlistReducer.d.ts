import { ChatMeta } from '../../types/global'
export type ChatList = {
  items: Map<string, ChatMeta>
  selected: string
}

export type ChatListAction = {
  type: 'incomingMsg',
  notified: string
} | {
  type: 'newChat',
  name: string,
  chatId: string
} | {
  type: 'deleteChat',
  chatId: string
} | {
  type: 'setActive',
  chatId: string
} | {
  type: 'rename',
  tmpId: string,
  chatId: string,
  name: string
} | {
  type: 'addTmpChat',
  tmpId: string
}
