import type {ChatListType} from '../contexts'
import type { FC } from 'react'

export type SideNavProps = FC<{
  chatList: ChatListType,
  setActiveChat: (id:string) => void,
  deleteChat: (id:string) => void
  addChat: () => void
}>
