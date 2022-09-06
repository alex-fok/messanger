import { ChangeEvent, FC, RefObject, Dispatch } from 'react'
import type { Chat } from '../contexts/app'
import type { UsersFoundState, UsersFoundAction } from '../reducers/usersFoundReducer'
import type { ChatMeta, ChatList } from '../reducers/chatlistReducer'

export type UsersFoundListFC = FC<{
  isLoading: boolean
  usersFound: UsersFoundState
  updateUsersFound: Dispatch<UsersFoundAction>
}>

export type UserLookUpFC = FC<{
  show: boolean,
  isAdding?: boolean,
  chatId?: string,
  onClose: () => void,
  keyword?: string
}>

export type UserActionIconFC = FC<{
  type: string,
  action: () => void
}>

export type SearchInputFC = FC<{
  input: string,
  searchRef: RefObject<HTMLInputElement>,
  changeInput: (e:ChangeEvent<HTMLInputElement>) => void,
  fetchSearch: () => void
}>

export type CurrentUsersFC = FC<{
  username:string,
  currentChat: ChatMeta | undefined
}>

export type FooterFC = FC<{
  chat: Chat,
  usersFound: UsersFoundState,
  onClose: () => void
}>
