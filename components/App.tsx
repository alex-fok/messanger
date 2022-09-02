import type { Data } from '../types/components/app'
import { FC, useMemo, useReducer, useState } from 'react'
import { setSocket, setSocketEventHandlers } from '../socket/client/socket'
import { chatListReducer, activeChatReducer } from '../reducers'
import Chat from './Chat'
import Layout from './Layout'
import SideNav from './SideNav'
import Context from '../contexts/app'
import getSocketEvents from '../socket/client/events/app'

const App:FC<{data:Data}> = ({data}) => {
  const jwt = useMemo(() => data.jwt, [data])
  const socket = useMemo(() => setSocket(jwt), [jwt])
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [activeChat, dispatchActiveChat] =
    useReducer(activeChatReducer, {
      id: '',
      history: [],
      participants:[]
  })
  const [chatList, dispatchChatList] = 
    useReducer(chatListReducer, {
      items: new Map(Object.entries(data.chats)),
      selected: ''
  })

  const socketEvents = useMemo(() => getSocketEvents(dispatchActiveChat, dispatchChatList), [dispatchChatList, dispatchActiveChat])
  setSocketEventHandlers(socketEvents)
  
  const defaultValue = {
    user: {
      username: data.username
    },
    search: {
      keyword: searchKeyword,
      setKeyword: setSearchKeyword
    },
    chat: {
      active: activeChat,
      list: chatList,
      dispatchActive: dispatchActiveChat,
      dispatchList: dispatchChatList,
    },
    socket
  }
  return (
    <Context.Provider value={defaultValue}>
      <Layout>
        <SideNav chatList={chatList} />
        <Chat selected={defaultValue.chat.active} />
      </Layout>
    </Context.Provider>
  )

}

export default App
