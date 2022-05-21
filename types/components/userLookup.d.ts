import type {ContextType} from '../contexts'
export type ContextType = ContextType

export type UserListEl = {
  username: string,
  added: boolean
}

export type UserLookUpPropType = {
  hideContent: () => void,
  keyword: string,
  setKeyword: (str: string) => void
}
