import type { ChatListType, ChatListActionType } from "../../types/context"
import {cloneDeep} from 'lodash'

const chatListReducer = (state: ChatListType, action: ChatListActionType):ChatListType => {
  switch(action.type) {
    case 'incomingMsg': {
      const notified = Object.assign({}, state.items[action.notified], {notification: true})
      const newList = Object.assign(cloneDeep(state.items), {[action.notified]: notified})
      return Object.assign(cloneDeep(state), {list: newList})
    }
    case 'newChat': {
      const newList = Object.assign(cloneDeep(state.items), {[action.chatId]: {name: action.name, notification: false}})
      return Object.assign(cloneDeep(state), {list: newList})
    }
    case 'setActive': {
      return Object.assign(cloneDeep(state), {active: action.chatId})
    }
    default:
      return state
  }
}

export default chatListReducer
