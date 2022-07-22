import { createContext } from 'react'
import type { ContextType } from '../../types/contexts'
import io from 'socket.io-client'

export default createContext<ContextType>({
  user: {
    username: ''
  },
  search: {
    keyword: '',
    setKeyword: () => {}
  },
  chat: {
    active: {
      id: '-1',
      history: [],
      participants:[]
    },
    dispatchActive: () => {},
    dispatchList: () => {},
    list: {
      items: new Map(),
      selected: ''
    },
  },
  socket: io()
})
