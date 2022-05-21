import AddButton from './AddButton'
import type {SideNavProps} from '../types/components/sideNav'

const itemClasses = 'text-gray-400 mb-5 hover:text-gray-800 cursor-pointer'
const chatListClasses = 'flex flex-row rounded-sm text-gray-600 text-sm px-2 py-1 mb-0 cursor-pointer hover:bg-gray-300'
const chatListActiveClasses = 'flex flex-row rounded-sm text-gray-600 text-sm px-2 py-1 mb-0 cursor-pointer bg-gray-300'

let _deleting:string
const SideNav:SideNavProps = ({chatList, setActiveChat, deleteChat, addChat}) => {
  
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
    <ul className='mt-12  text-xl font-semibold'>
      <li className={itemClasses}><a>Contact</a></li>
      <li className={itemClasses}><a>Profile</a></li>
    </ul>
    <br />
    <details open className='h-3/4 pb-24 cursor-default'>
      <summary className='text-gray-400 text-base font-light mb-2'>
        <span className='select-none'>Direct Messages
        <span className='float-right'>
          <AddButton
            onClick={handleAdd}
          />
        </span>
        </span>
      </summary>

      <ul className='h-5/6 overflow-y-auto select-none pb-4'>
        { Array.from(chatList.items.entries()).reverse().map(([id, properties]) => 
          <li
            className={chatList.selected === id ? chatListActiveClasses : chatListClasses}
            key={id}
            onClick={() => handleSetActive(id) }
          >
            <span className='flex-auto'>
              {properties.name.length < 16 ? properties.name : properties.name.slice(0, 16) + '...'}
            </span>
            <span
              className='order-last hover:text-gray-200'
              onClick={() => handleDelete(id)}
            >&#x2716;
            </span>
          </li>
        )}
      </ul>
    </details>
    </nav>
  )
}
export default SideNav
