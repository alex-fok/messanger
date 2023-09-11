import { useState, useMemo, useCallback, useEffect, useContext } from 'react'
import RightArrow from './RightArrow'
import ChatListBtns from './ChatListBtns'
import AppContext from 'contexts/app'
import type { ChatItemFC, ChatItemsFC } from 'types/components/sideNav'

const ChatListItem:ChatItemFC = ({id, isSelected, meta, showAddUser}) => {
  const [isBtnsVisible, setIsBtnsVisible] = useState(false)
  const {chat, socket} = useContext(AppContext)
  const [dispatchActive, dispatchList] = useMemo(() => [chat.dispatchActive, chat.dispatchList], [chat])
  const setActive = useCallback(() => {
    dispatchList({type: 'setActive', chatId: id})
    dispatchActive({type: 'switchActive', chatId: id})
    socket.emit('getChat', id)
  }, [dispatchList, dispatchActive])

  const deleteChat = useCallback(() => {
    dispatchActive({type: 'deselect', chatId: id})
    dispatchList({type: 'deleteChat', chatId: id})
    socket.emit('removeChat', id)
  }, [dispatchActive, dispatchList])

  const addUser = useCallback(() => {
    socket.emit('getParticipants', id)
    showAddUser(id)
  }, [showAddUser])
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
          onClick={setActive}
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
        setActive={setActive}
        addUser={addUser}
        deleteChat={deleteChat}
      />
    </li>
  )
}

const ChatList:ChatItemsFC = ({chatList, showAddUser}) => {
  const chatArray = useMemo(() => Array.from(chatList.items.entries()).reverse(), [chatList])
 
  return (
    <ul className='h-5/6 overflow-y-auto select-none pb-4'>
      { chatArray.map(([id, properties]) => 
        <ChatListItem
          key={id}
          id={id}
          meta={properties}
          isSelected={chatList.selected === id}
          showAddUser={showAddUser}
        /> 
      )}
    </ul>
  )
}

export default ChatList
