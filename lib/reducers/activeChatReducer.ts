import {cloneDeep} from 'lodash'
import type { ActiveChatType, ChatActionType } from '../../types/context'

const activeChatReducer = (state: ActiveChatType, action: ChatActionType):ActiveChatType => {
  console.log('action:', action)
  switch(action.type) {
    case 'switchActive': { 
      return ({
        id: action.chatId,
        history: [/*Loading Chat*/]
      })
    }
    case 'addMsg': {
      const newActive = cloneDeep(state)
      newActive.history.push({
        sender: action.user,
        timestamp: undefined,
        message: action.message
      })
      return newActive
    }
    case 'createMsg': {
      if (state.id !== action.chatId) return state
      const copy = cloneDeep(state)     
      copy.history[action.index].timestamp = action.timestamp
      return copy
    }
    case 'createChat': {
      if (state.id !== action.tmpId) return state
      const copy = cloneDeep(state)
      copy.history[0].timestamp = action.timestamp
      copy.id = action.chatId
      delete copy.tmpId
      return copy
    }
    case 'renewChat': {
      if (state.id !== action.chatId) return state
      return ({
        id: action.chatId,
        history: action.history
      })
    }
    default:
      return state
  }
}
export default activeChatReducer
