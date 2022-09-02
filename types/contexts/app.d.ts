import type { Dispatch, SetStateAction } from 'react'
import type { ActiveChat, ChatAction } from '../reducers/activeChatReducer'
import type { ChatList, ChatListAction } from '../reducers/chatlistReducer'
import type { Socket } from 'socket.io-client'

type Search = {
  keyword: string,
  setKeyword: Dispatch<SetStateAction<string>>
}

type User = {
  username: string
}

export type ChatList = ChatList

export type Chat = {
  active: ActiveChat,
  list: ChatList,
  dispatchActive: Dispatch<ChatAction>,
  dispatchList: Dispatch<ChatListAction>,
}

export type AppContext = {
  user: User,
  search: Search,
  chat: Chat,
  socket: Socket
}
