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
  handleAdd: () => void
}>
export type ChatListBtnsFC = FC<{
  isVisible: boolean,
  handleSetActive: () => void,
  handleDelete: () => void
}>
export type ChatItemFC = FC<{
  id: string,
  isSelected:boolean,
  meta: ChatMeta
}>

export type ChatItemsFC = FC<{
  chatList: ChatList
}>
