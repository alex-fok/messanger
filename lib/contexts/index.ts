import { createContext } from 'react'
import type { ContextType } from '../../types/context'

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
    },
    dispatchActive: () => {},
    list:{
      items: new Map(),
      selected: ''
    }
  }
})

