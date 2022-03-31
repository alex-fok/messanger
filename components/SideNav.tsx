import { FC } from 'react'
import type { ChatListType } from '../types/context'

type SideNavProps = { chatList: ChatListType, setActiveChat: (id:string) => void }

const itemClasses = 'text-gray-400 mb-5 hover:text-gray-800 cursor-pointer'
const chatListClasses = 'rounded-sm text-gray-600 text-sm px-2 py-1 mb-0 cursor-pointer hover:bg-gray-300'
const chatListActiveClasses = 'rounded-sm text-gray-600 text-sm px-2 py-1 mb-0 cursor-pointer bg-gray-300'

const SideNav:FC<SideNavProps> = ({chatList, setActiveChat}) => {
  return (
    <nav className='w-44 ml-4 lg:ml-12 px-2 h-full'>
    <ul className='mt-12  text-xl font-semibold'>
      <li className={itemClasses}><a>Contact</a></li>
      <li className={itemClasses}><a>Profile</a></li>
    </ul>
    <br />
    <details open className='h-3/4 pb-24'>
      <summary className='text-gray-400 text-base font-light mb-2'>Direct Messages</summary>
      <ul className='h-5/6 overflow-y-auto select-none pb-4'>
        {
          Object.entries(chatList.items).map(([id, properties]) => 
            <li
              className={chatList.selected === id ? chatListActiveClasses : chatListClasses}
              key={id}
              onClick={() => {setActiveChat(id)}}
            >{properties.name.length < 16 ? properties.name : properties.name.slice(0, 16) + '...'}
            </li>
          )
        }
      </ul>
    </details>
    </nav>
  )
}
export default SideNav
