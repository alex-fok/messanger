import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { FC, useMemo, useReducer, useState } from 'react'

import Layout from '../components/Layout'
import SideNav from '../components/SideNav'
import Chat from '../components/Chat'
import getJwtPayload from '../lib/authentication/getJwtPayload'
import Context from '../lib/contexts'
import {activeChatReducer, chatListReducer} from '../lib/reducers'
import useSocket, {createSocket} from '../lib/hooks/useSocket'
import dbUser from '../lib/db/user'
import { cloneDeep } from 'lodash'

type ChatsType = {
  unread: number,
  name: string
}
type PayloadType = {
  username: string,
  jwt:string
} | null 
type ServerSidePropsType = {
  props: {
    data: {
      username: string,
      jwt:string,
      chats: Record<string, ChatsType>
    }
  }
} | {
  redirect: {
    destination: string,
    permanent: boolean
  }
}
export async function getServerSideProps(context:GetServerSidePropsContext):Promise<ServerSidePropsType> {
  const payload:PayloadType = await getJwtPayload(context.req.headers.cookie)
    return payload ? {
      props: {
        data: {
          username:payload.username,
          jwt:payload.jwt,
          chats: (await dbUser.get(payload.username))?.chats || {}
        }
      }
    } : {
    redirect: {
      destination: '/login',
      permanent: false
    }
  }
}

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({data}) => {
  console.log(data)
  const jwt = useMemo(() => data.jwt, [data])
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [activeChat, dispatchActiveChat] = useReducer(activeChatReducer, {
    id: '-1',
    tmpId: `${data.username}_${Date.now()}`,
    name: 'untitled',
    history: [],
    participants: []
  })
  const [chatList, dispatchChatList] = useReducer(chatListReducer, {
    items: Object.keys(data.chats).length === 0 ? {'-1': {name: 'untitled', unread: 0}} : data.chats,
    selected: '-1'
  })
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
      list: chatList
    }
  }
  const setActiveChat = (id:string) => dispatchChatList({type: 'setActive', chatId: id})
  
  const socket = useMemo(() => createSocket(jwt), [jwt])
  useSocket('createChatResponse', (tmpId:string, chatId:string, timestamp:number) => {
    dispatchActiveChat({type: 'createChat', tmpId, chatId, timestamp})
  })
  useSocket('messageResponse', (index:number, chatId:string, timestamp:number) => {
    dispatchActiveChat({type:'createMsg', index, chatId, timestamp})
  })
  useSocket('newChat', (chatId:string, name:string) => {
    dispatchChatList({type:'newChat', chatId, name})
  })
  const addMsg = (message: string) => {
    const length = activeChat.history.length
    dispatchActiveChat({type: 'addMsg', user: data.username, message})
    socket.emit('message', length, activeChat.id, message)
  }
  
  const createChat = (message:string) => {
    dispatchActiveChat({type: 'addMsg', user:data.username, message})
    socket.emit('createChat', activeChat.tmpId, [], message)
  }
  return (
    <Context.Provider value={defaultValue}>
      <Layout>
        <div className='flex flex-row h-full'>
          <SideNav
            chatList={defaultValue.chat.list}
            setActiveChat={setActiveChat}
          />
         <Chat
            chat={defaultValue.chat.active}
            addMessage={addMsg}
            createChat={createChat}
          />
        </div>
      </Layout>
    </Context.Provider>
  )
}
export default Home
