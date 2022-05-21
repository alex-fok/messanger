import type { ActiveChatType, ChatActionType } from '../types/contexts'

const activeChatReducer = (state: ActiveChatType, action: ChatActionType):ActiveChatType => {
  console.log('action:', action)
  switch(action.type) {
    case 'switchActive': { 
      return {
        id: action.chatId,
        history: [/*Loading Chat*/]
      }
    }
    case 'addMsg': {
      const copy = state.history.slice()
      copy.push({
        sender: action.user,
        timestamp: undefined,
        message: action.message
      })
      return {
        id:state.id,
        history: copy
      }
    }
    case 'createMsg': {
      if (state.id !== action.chatId) return state
      state.history[action.index].timestamp = action.timestamp
      return {...state}
    }
    case 'createChat': {
      if (state.id !== action.tmpId) return state
      state.history[0].timestamp = action.timestamp
      state.id = action.chatId
      delete state.tmpId
      return {...state}
    }
    case 'renewChat': {
      if (state.id !== action.chatId) return state
      return {
        id: action.chatId,
        history: action.history
      }
    }
    case 'deselect': {
      if (state.id !== action.chatId) return state
      return {
        id: '',
        history: []
      }
    }
    case 'newMsg': {
      if (state.id !== action.chatId) return state
      const copy = state.history.slice()
      copy.push(action.message)
      return {
        id: state.id,
        history: copy
      }
    }
    default:
      return state
  }
}
export default activeChatReducer
