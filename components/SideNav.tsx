import { FC, useContext, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from './common/Button'
import UserLookUp from './UserLookUp'
import AppContext from '../contexts/app'

import type {
  SideNavFC,
  DMTitleFC,
  ChatItemsFC,
  ChatItemFC,
  ExpandBtnFC,
  ChatListBtnsFC
} from '../types/components/sideNav'

let _deleting:string

const ChatListBtns:ChatListBtnsFC = ({isVisible, handleSetActive, handleDelete}) => {
  return (
    <div className={`flex flex-row justify-between px-6 ${isVisible ? 'visible' : 'invisible'}`}>
      <Button
        className='grow hover:text-cyan-600'
        onClick={() => handleSetActive()}
      ><FontAwesomeIcon icon={['fas', 'comments']} />
      </Button>
      <Button
        className='grow border-l border-gray-400 hover:text-green-600'
        onClick={() => {}}
      ><FontAwesomeIcon icon={['fas', 'user-plus']} />
      </Button>
      <Button
        className='grow border-l border-gray-400 hover:text-red-700'
        onClick={() => handleDelete()}
      ><FontAwesomeIcon icon={['fas', 'x']} />
      </Button>
    </div>
  )
}

const Selections:FC = () => {
  const itemClasses = 'text-gray-400 mb-5 hover:text-gray-800 cursor-pointer'
  return (
    <ul className='mt-12 text-xl font-semibold'>
      <li className={itemClasses}><a>Contact</a></li>
      <li className={itemClasses}><a>Profile</a></li>
    </ul>
  )
}

const RightArrow:ExpandBtnFC = ({className, isExpanded}) => {
  return (
    <span className={`${className} flex items-center justify-center w-6`}>
      <FontAwesomeIcon
        className={`transition ${isExpanded ? 'rotate-90': ''}`}
        icon={['fas', 'angle-right']}
      />
    </span>
  )
}

const DMTitle:DMTitleFC = ({handleAdd}) => {
  return (
    <summary className='text-gray-400 text-base font-light mb-2'>
      <span className='select-none'>Direct Messages
        <span className='float-right'>
          <Button
            className='w-6 h-6 rounded-full font-black text-xs text-gray-400 hover:bg-gray-400 hover:text-gray-50'
            onClick={handleAdd}
          ><FontAwesomeIcon icon={['fas','plus']}/>
          </Button>
        </span>
      </span>
    </summary>
  )
}

const ChatListItem:ChatItemFC = ({id, isSelected, meta}) => {
  const [isBtnsVisible, setIsBtnsVisible] = useState(false)
  const {chat, socket} = useContext(AppContext)
  const [dispatchActive, dispatchList] = useMemo(() => [chat.dispatchActive, chat.dispatchList], [chat])
  
  const setActive = (chatId:string) => {
    if(_deleting === chatId) return
    dispatchList({type: 'setActive', chatId})
    dispatchActive({type: 'switchActive', chatId})
    socket.emit('getChat', chatId)
  }

  const deleteChat = (chatId:string) => {
    dispatchActive({type: 'deselect', chatId})
    dispatchList({type: 'deleteChat', chatId})
    socket.emit('removeChat', chatId)
  }

  useEffect(() => { setIsBtnsVisible(isSelected) }, [isSelected])

  return (
    <li
      className={`flex flex-col justify-around rounded-md text-gray-600 text-sm mb-0 cursor-pointer`}
      key={id}
      onMouseOver={() => setIsBtnsVisible(() => true)}
      onMouseLeave={() => setIsBtnsVisible(() => isSelected || false)}
    >
      <div className={`flex flex-row justify-around`}>
        <span
          className={`rounded-l-sm px-1 py-1 ${isSelected ? 'font-medium' : ''}`}
          onClick={() => setActive(id)}
        >
          {meta.name.length < 15 ? meta.name : meta.name.slice(0, 15) + '...'}
        </span>
        <RightArrow
          className='order-last'
          isExpanded={isBtnsVisible}
        ></RightArrow>
      </div>
      <ChatListBtns
        isVisible={isBtnsVisible}
        handleSetActive={() => setActive(id)}
        handleDelete={() => deleteChat(id)}
      />
    </li>
  )
}

const ChatList:ChatItemsFC = ({chatList}) => {
  const chatArray = useMemo(() => Array.from(chatList.items.entries()).reverse(), [chatList])
 
  return (
    <ul className='h-5/6 overflow-y-auto select-none pb-4'>
      { chatArray.map(([id, properties]) => 
        <ChatListItem
          key={id}
          id={id}
          meta={properties}
          isSelected={chatList.selected === id}
        /> 
      )}
    </ul>
  )
}

const SideNav:SideNavFC = ({chatList}) => {
  const [isCreating, setIsCreating] = useState(false)
  
  const handleAdd = () => {
    setIsCreating(true)
  }

  return (
    <>
      <UserLookUp
        show={isCreating}
        onClose={() => { setIsCreating(false) }}
      />
      <nav className='w-44 ml-4 lg:ml-12 px-2 h-full'>
        <Selections />
        <br />
        <details open className='h-3/4 pb-24 cursor-default'>
          <DMTitle handleAdd={handleAdd} />
          <ChatList chatList={chatList}/>
        </details>
      </nav>
    </>
  )
}
export default SideNav
