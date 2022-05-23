import type { FC } from 'react'
import type { ChatList } from '../reducers/chatlistReducer'

export type SideNavProps = FC<{
  chatList: ChatList,
  setActiveChat: (id:string) => void,
  deleteChat: (id:string) => void
  addChat: () => void
}>
