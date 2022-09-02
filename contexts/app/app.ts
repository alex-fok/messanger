import { createContext } from 'react'
import type { AppContext, ChatList } from '../../types/contexts/app'
import io from 'socket.io-client'

export default createContext<AppContext>({
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
      participants:[],
    },
    list: {
      items: new Map(),
      selected:''
    },
    dispatchActive: () => {},
    dispatchList: () => {},
  },
  socket: io()
})
