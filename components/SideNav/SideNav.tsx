import { useCallback, useState } from 'react'
import UserLookUp from '../UserLookUp'
import Selections from './Selections'
import DMTitle from './DMTitle'
import ChatList from './ChatList'
import type { SideNavFC } from '../../types/components/sideNav'

const SideNav:SideNavFC = ({chatList}) => {
  const [userSearch, setUserSearch] = useState({isSearching: false, isAdding: false, chatId: ''})
  const createChat = useCallback(() => setUserSearch({isSearching: true, isAdding: false, chatId: ''}), [setUserSearch])
  const showAddUser = useCallback((chatId:string) => { setUserSearch({isSearching: true, isAdding: true, chatId})}, [setUserSearch])

  return (
    <>
      <UserLookUp
        show={userSearch.isSearching}
        isAdding={userSearch.isAdding}
        chatId={userSearch.chatId}
        onClose={() => { setUserSearch({isSearching: false, isAdding: false, chatId: ''}) }}
      />
      <nav className='w-44 ml-4 lg:ml-12 px-2 h-full'>
        <Selections />
        <br />
        <details open className='h-3/4 pb-24 cursor-default'>
          <DMTitle createChat={createChat} />
          <ChatList
            showAddUser={showAddUser}
            chatList={chatList}/>
        </details>
      </nav>
    </>
  )
}
export default SideNav

