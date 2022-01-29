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
      name: 'untitiled',
      history: [],
      participants: []
    },
    dispatchActive: () => {},
    list:{
      items: {},
      selected: ''
    }
  }
})

