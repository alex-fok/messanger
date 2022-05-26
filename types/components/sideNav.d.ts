import type { FC, MouseEventHandler } from 'react'
import type { ChatList } from '../reducers/chatlistReducer'
import type { ChatMeta } from '../global'

export type SideNavFC = FC<{
  chatList: ChatList,
  setActiveChat: (id:string) => void,
  deleteChat: (id:string) => void
  addChat: () => void
}>

export type ExpandBtnFC = FC<{
  className: string,
  isExpanded: boolean,
}>

export type DMTitleFC = FC<{
  handleAdd: () => void
}>
export type ChatListBtnsFC = FC<{
  isVisible: boolean
  handleSetActive: () => void
}>
export type ChatItemFC = FC<{
  id: string,
  isSelected:boolean
  meta: ChatMeta,
  handleSetActive: (id:string) => void,
}>

export type ChatItemsFC = FC<{
  chatList: ChatList,
  handleSetActive: (id:string) => void,
  handleDelete: (id: string) => void
}>
