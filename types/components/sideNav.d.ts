import type { FC, MouseEventHandler } from 'react'
import type { ChatList } from '../reducers/chatlistReducer'
import type { ChatMeta } from '../global'

export type SideNavFC = FC<{
  chatList: ChatList
}>

export type ExpandBtnFC = FC<{
  className: string,
  isExpanded: boolean
}>

export type DMTitleFC = FC<{
  createChat: () => void
}>
export type ChatListBtnsFC = FC<{
  isVisible: boolean,
  setActive: () => void,
  addUser: () => void,
  deleteChat: () => void
}>
export type ChatItemFC = FC<{
  id: string,
  isSelected:boolean,
  meta: ChatMeta,
  addUser: () => void
}>

export type ChatItemsFC = FC<{
  chatList: ChatList,
  addUser: () => void
}>
