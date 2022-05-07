import type { Dispatch, SetStateAction } from 'react'

export type SearchType = {
  keyword: string,
  setKeyword: Dispatch<SetStateAction<string>>
}

export type MessageType = {
  sender: string,
  timestamp: number | undefined,
  message: string
}

export type ActiveChatType = {
  id: string,
  history: MessageType[],
  tmpId?: string
}

export type ChatActionType = {
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
  history: MessageType[]
} | {
  type: 'newMsg',
  chatId: string,
  message: string
}

export type ChatListType = {
  items: Map<string, {name: string, unread: number}>
  selected: string
}

export type ChatListActionType = {
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
  type: 'addTempChat',
  tmpId: string
}

export type UserType = {
  username: string
}

export type ChatType = {
  active: ActiveChatType,
  dispatchActive: Dispatch<ChatActionType>
  list: ChatListType //ids 
}

export type ContextType = {
  user: UserType,
  search: SearchType,
  chat: ChatType
}
