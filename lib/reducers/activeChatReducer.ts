import {cloneDeep} from 'lodash'
import type { ActiveChatType, ChatActionType } from '../../types/context'

const activeChatReducer = (state: ActiveChatType, action: ChatActionType):ActiveChatType => {
  switch(action.type) {
    case 'addMsg':
      const newActive = cloneDeep(state)
      newActive.history.push({
        sender: {
          displayName: action.user,
        },
        time: undefined,
        message: action.message
      })
      return newActive
    case 'addChat':
      return {id: '-1', name: action.participants.toString(), history: [], participants: action.participants}
    case 'createChat':
      return Object.assign(cloneDeep(state), {id: action.chatId})
    default:
      return state
  }
}
export default activeChatReducer
