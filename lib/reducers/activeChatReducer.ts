import {cloneDeep} from 'lodash'
import type { ActiveChatType, ChatActionType } from '../../types/context'

const activeChatReducer = (state: ActiveChatType, action: ChatActionType):ActiveChatType => {
  switch(action.type) {
    case 'addMsg': {
      const newActive = cloneDeep(state)
      newActive.history.push({
        sender: {
          displayName: action.user,
        },
        timestamp: undefined,
        message: action.message
      })
      return newActive
    }
    case 'addChat': {
      return {id: '-1', name: action.participants.toString(), history: [], participants: action.participants}
    }
    case 'createMsg': {
      if (state.id !== action.chatId) return state
      const copy = cloneDeep(state)     
      copy.history[action.index].timestamp = action.timestamp
      return copy
    }
    case 'createChat': {
      if (state.tmpId !== action.tmpId) return state
      const copy = cloneDeep(state)
      copy.history[0].timestamp = action.timestamp
      copy.id = action.chatId
      delete copy.tmpId
      return copy
    }
    default:
      return state
  }
}
export default activeChatReducer
