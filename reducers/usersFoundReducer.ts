import type { UsersFoundState, UsersFoundAction } from "types/reducers/usersFoundReducer"

export const usersFoundReducer = (state:UsersFoundState, action:UsersFoundAction):UsersFoundState => {
  switch (action.type) {
    case 'set':
      if (!action.value) return state
      state.list = action.value
      state.count = 0
      return {...state}
    case 'add':
      state.list[action.index].added = true
      state.count++
      return {...state} 
    case 'remove':
      state.list[action.index].added = false
      if (state.count) state.count--
      return {...state}
    default:
      return state
  }
}
