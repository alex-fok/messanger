import type { ChatList, ChatListAction } from "types/reducers/chatlistReducer"

const chatListReducer = (state: ChatList, action: ChatListAction):ChatList => {
  console.log('action:', action)
  switch(action.type) {
    case 'incomingMsg': {
      const updated = state.items.get(action.notified)
      if(!updated) return state
      updated['unread']++
      state.items.set(action.notified, updated)
      return {...state}
    }
    case 'setActive': {
      if (state.selected === action.chatId) return state 
      state.selected = action.chatId
      return {...state}
    }
    case 'deleteChat': {
      if (state.selected === action.chatId) state.selected = ''
      state.items.delete(action.chatId)
      return {...state}
    }
    case 'reassignId': {
      state.items.set(action.chatId, state.items.get(action.tmpId) || {name: action.name, unread: 0, participants:[]})
      state.items.delete(action.tmpId)
      if(state.selected === action.tmpId) state.selected = action.chatId 
      return {...state}
    }
    case 'updateParticipants': {
      const chat = state.items.get(action.chatId)
      if (!chat) return {...state}
      chat.participants = action.participants
      state.items.set(action.chatId, chat)
      return {...state}
    }
    case 'addTmpChat': {
      state.items.set(action.tmpId, {name: action.participants.join(','), unread: 0, participants: action.participants})
      state.selected = action.tmpId
      return {...state}
    }
    default:
      return state
  }
}

export default chatListReducer
