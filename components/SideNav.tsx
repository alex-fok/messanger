import { FC } from 'react'
import type { ChatListType } from '../types/context'

type SideNavProps = { chatList: ChatListType, setActiveChat: (id:string) => void }

const itemClasses = 'text-gray-400 mb-5 hover:text-gray-800 cursor-pointer'
const chatListClasses = 'rounded-sm text-gray-600 text-sm px-2 py-1 mb-1 cursor-pointer hover:bg-gray-300'
const chatListActiveClasses = 'rounded-sm text-gray-600 text-sm px-2 py-1 mb-1 cursor-pointer bg-gray-300'

const SideNav:FC<SideNavProps> = ({chatList, setActiveChat}) => {
  return (
    <nav className='w-44 ml-4 lg:ml-12 px-2'>
    <ul className='mt-12  text-xl font-semibold'>
      <li className={itemClasses}><a>Contact</a></li>
      <li className={itemClasses}><a>Profile</a></li>
    </ul>
    <br />
    <figure>
      <figcaption className='text-gray-400 text-base font-light mb-2'>Direct Messages</figcaption>
      <ul>
        {
          Object.entries(chatList.items).map(chat => {
            const [id, properties] = chat
            return (
              <li
                className={chatList.selected === id ? chatListActiveClasses : chatListClasses}
                key={id}
                onClick={() => {setActiveChat(id)}}
              >{properties.name.length < 16 ? properties.name : properties.name.slice(0, 16) + '...'}
              </li>
            )
          })
        }
      </ul>
    </figure>
    </nav>
  )
}
export default SideNav
