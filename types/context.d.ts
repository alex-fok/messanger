import type { Dispatch, SetStateAction } from 'react'

export type SearchType = {
  keyword: string,
  setKeyword: Dispatch<SetStateAction<string>>
}

export type MessageType = {
  sender: {
    displayName: string,
  },
  timestamp: number | undefined,
  message: string
}

export type ActiveChatType = {
  id: string,
  name: string,
  history: MessageType[],
  participants: string[],
  tmpId?: string
}

export type ChatActionType = {
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
}

export type ChatListType = {
  items: Record<string, {name: string, unread: number}>
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
  type: 'setActive',
  chatId: string
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
