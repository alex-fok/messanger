import type { Dispatch, SetStateAction } from 'react'

export type SearchType = {
  keyword: string,
  setKeyword: Dispatch<SetStateAction<string>>
}

export type MessageType = {
  sender: {
    displayName: string,
  },
  time: Date | undefined,
  message: string
}

export type ActiveChatType = {
  id: string,
  name: string,
  history: MessageType[],
  participants: string[]
}

export type ChatActionType = {
  type: 'addMsg',
  message: string,
  user: string
} | {
  type: 'addChat',
  participants: string[]
} | {
  type: 'createChat',
  chatId: string
}

export type ChatListType = {
  items: Record<string, {name: string, notification: boolean}>
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
