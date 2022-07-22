import type { ActiveChat, ChatAction } from '../types/reducers/activeChatReducer'
const getEmpty = () => ({
  id: '',
  history: [],
  participants: []
})

const activeChatReducer = (state: ActiveChat, action: ChatAction):ActiveChat => {
  console.log('action:', action)
  switch(action.type) {
    case 'switchActive': { 
      return {
        id: action.chatId,
        history: [/*Loading Chat*/],
        participants: [/*Loading Partcipants*/]
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
        ...state,
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
    case 'createTmp' : {
      return {
        id: action.tmpId,
        history: [],
        participants: action.participants,
        tmpId: action.tmpId
      }
    }
    case 'renewChat': {
      if (state.id !== action.chatId) return state
      return {
        ...state,
        history: action.history
      }
    }
    case 'deselect': {
      if (state.id !== action.chatId) return state
      return getEmpty()
    }
    case 'newMsg': {
      if (state.id !== action.chatId) return state
      const copy = state.history.slice()
      copy.push(action.message)
      return {
        ...state,
        history: copy
      }
    }
    default:
      return state
  }
}
export default activeChatReducer
