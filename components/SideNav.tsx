import { FC, useEffect, useMemo, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type {SideNavFC, DMTitleFC, ChatItemsFC, ChatItemFC, ExpandBtnFC, ChatListBtnsFC} from '../types/components/sideNav'
import Button from './common/Button'

let _deleting:string

const ChatListBtns:ChatListBtnsFC = ({isVisible, handleSetActive}) => {
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
          onClick={() => handleSetActive()}
        ><FontAwesomeIcon icon={['fas', 'x']} />
        </Button>
      </div>
  )
}

const Selections:FC = () => {
  const itemClasses = 'text-gray-400 mb-5 hover:text-gray-800 cursor-pointer'
  return (
    <ul className='mt-12  text-xl font-semibold'>
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

const ChatListItem:ChatItemFC = ({id, isSelected, meta, handleSetActive}) => {
  const [isBtnsVisible, setIsBtnsVisible] = useState(false)
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
          onClick={() => handleSetActive(id)}
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
        handleSetActive={() => handleSetActive(id)}
      />
    </li>
  )
}

const ChatList:ChatItemsFC = ({ chatList, handleSetActive, handleDelete }) => {
  const chatArray = useMemo(() => Array.from(chatList.items.entries()).reverse(), [chatList])
  return (
    <ul className='h-5/6 overflow-y-auto select-none pb-4'>
      { chatArray.map(([id, properties]) => 
        <ChatListItem
          key={id}
          id={id}
          meta={properties}
          isSelected={chatList.selected === id}
          handleSetActive={handleSetActive}
//          handleDelete={handleDelete}
        /> 
      )}
    </ul>
  )
}

const SideNav:SideNavFC = ({chatList, setActiveChat, deleteChat, addChat}) => {
  const handleSetActive = (id:string) => {
    if (_deleting !== id) setActiveChat(id)
  }
  const handleDelete = (id:string) => {
    deleteChat(id)
    _deleting = id
  }
  const handleAdd = () => { addChat() }

  return (
    <nav className='w-44 ml-4 lg:ml-12 px-2 h-full'>
      <Selections />
      <br />
      <details open className='h-3/4 pb-24 cursor-default'>
        <DMTitle handleAdd={handleAdd} /> 
        <ChatList
          chatList={chatList}
          handleSetActive={handleSetActive}
          handleDelete={handleDelete}
        />
      </details>
    </nav>
  )
}
export default SideNav
