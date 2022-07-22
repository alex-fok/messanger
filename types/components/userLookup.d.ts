import { ChangeEvent, FC, RefObject, Dispatch } from 'react'
import type {ContextType} from '../contexts'
import type { UsersFoundState, UsersFoundAction } from '../reducers/usersFoundReducer'
import type { ChatAction } from '../reducers/activeChatReducer'
export type ContextType = ContextType

export type UsersFoundListFC = FC<{
  isLoading: boolean
  usersFound: UsersFoundState
  updateUsersFound: Dispatch<UsersFoundAction>
}>

export type UserLookUpFC = FC<{
  show: boolean,
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

export type FooterFC = FC<{
  usersFound: UsersFoundState,
  onClose: () => void
}>
