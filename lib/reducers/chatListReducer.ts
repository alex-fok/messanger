import type { ChatListType, ChatListActionType } from "../../types/context"
import {cloneDeep} from 'lodash'

const chatListReducer = (state: ChatListType, action: ChatListActionType):ChatListType => {
  console.log('action:', action)
  switch(action.type) {
    case 'incomingMsg': {
      const notified = Object.assign({}, state.items[action.notified], {notification: true})
      const newList = Object.assign(cloneDeep(state.items), {[action.notified]: notified})
      return Object.assign(cloneDeep(state), {list: newList})
    }
    case 'newChat': {
      const newList = Object.assign(cloneDeep(state.items), {[action.chatId]: {name: action.name, unread: 1}})
      return Object.assign({selected: state.selected}, {items: newList})
    }
    case 'setActive': {
      return Object.assign(cloneDeep(state), {selected: action.chatId})
    }
    case 'rename': {
      const newList = Object.assign(cloneDeep(state.items), {[action.chatId]: {name: action.name, unread: 0}})
      delete newList[action.tmpId]
      return Object.assign({selected: state.selected === action.tmpId ? action.chatId : state.selected}, {items: newList})
    }
    default:
      return state
  }
}

export default chatListReducer
