import { ChangeEvent, FC, RefObject, Dispatch } from 'react'
import type { Chat, AppContext } from '../contexts/app'
import type { UsersFoundState, UsersFoundAction } from '../reducers/usersFoundReducer'
import type { ActiveChat, ChatAction } from '../reducers/activeChatReducer'
export type AppContext = AppContext

export type UsersFoundListFC = FC<{
  isLoading: boolean
  usersFound: UsersFoundState
  updateUsersFound: Dispatch<UsersFoundAction>
}>

export type UserLookUpFC = FC<{
  show: boolean,
  isAdding?: boolean,
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
  active: ActiveChat
}>

export type FooterFC = FC<{
  chat: Chat,
  usersFound: UsersFoundState,
  onClose: () => void
}>
