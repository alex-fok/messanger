import type { Data } from '../types/components/app'
import { FC, useMemo, useReducer, useState } from 'react'
import { setSocket, setSocketEventHandlers } from '../socket/client/socket'
import { chatListReducer, activeChatReducer } from '../reducers'
import Chat from './Chat'
import Layout from './Layout'
import SideNav from './SideNav'
import Context from '../contexts/app'
import getSocketEvents from '../socket/client/events/app'
import { getNewVal } from '../utils/valGenerator'

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
 
 const setActiveChat = (chatId:string) => {
    dispatchChatList({type: 'setActive', chatId})
    dispatchActiveChat({type: 'switchActive', chatId})
    socket.emit('getChat', chatId)
  }
  const deleteChat = (chatId:string) => {
    dispatchChatList({type: 'deleteChat', chatId})
    dispatchActiveChat({type: 'deselect', chatId})
    socket.emit('removeChat', chatId)
  }
  const addChat = (participants:string[]) => {
    const val = getNewVal()
    dispatchChatList({type: 'addTmpChat', tmpId: val})
    dispatchActiveChat({type: 'switchActive', chatId: val})
  }
  const addMsg = (message: string) => {
    dispatchActiveChat({type: 'addMsg', user: data.username, message})
    socket.emit('message', activeChat.history.length, activeChat.id, message)
  }
  
  const createChat = (message:string) => {
    dispatchActiveChat({type: 'addMsg', user:data.username, message})
    socket.emit('createChat', activeChat.id, activeChat.participants, message)
  }
  
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
      dispatchActive: dispatchActiveChat,
      dispatchList: dispatchChatList,
      list: chatList
    },
    socket
  }
  return (
    <Context.Provider value={defaultValue}>
      <Layout>
        <SideNav
          chatList={defaultValue.chat.list}
          setActiveChat={setActiveChat}
          deleteChat={deleteChat}
          addChat={addChat}
        />
        <Chat
          chat={defaultValue.chat.active}
          addMessage={addMsg}
          createChat={createChat}
        />
      </Layout>
    </Context.Provider>
  )

}

export default App
