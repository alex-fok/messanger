import type { Dispatch, SetStateAction } from 'react'
import type { Message } from '../global'
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

export type Chat = {
  active: ActiveChat,
  dispatchActive: Dispatch<ChatAction>,
  dispatchList: Dispatch<ChatListAction>,
}

export type AppContext = {
  user: User,
  search: Search,
  chat: Chat,
  socket: Socket
}
