import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React, { FC, useReducer, useState } from 'react'

import Layout from '../components/Layout'
import SideNav from '../components/SideNav'
import Chat from '../components/Chat'
import getJwtPayload from '../lib/authentication/getJwtPayload'
import Context from '../lib/contexts'
import {activeChatReducer, chatListReducer} from '../lib/reducers'

type PayloadType = {username: string} | undefined

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const payload:PayloadType = await getJwtPayload(context.req.headers.cookie)
  return payload ? {
    props: {
      data: payload
    }
  } : {
    redirect: {
      destination: '/login',
      permanent: false
    }
  }
}

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({data}) => {
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [activeChat, dispatchActiveChat] = useReducer(activeChatReducer, { id: '-1', name: 'untitled', history: [], participants: [] })
  const [chatList, dispatchChatList] = useReducer(chatListReducer, {
    items: {'-1': {name: 'untitled', notification: false}},
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
  const addMsg = (message: string) => dispatchActiveChat({type: 'addMsg', user: data.username, message})

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
          />
        </div>
      </Layout>
    </Context.Provider>
  )
}
export default Home;
