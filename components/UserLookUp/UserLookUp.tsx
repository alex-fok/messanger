import { useContext, useState, useReducer, useEffect, useCallback, useRef } from 'react'
import Dialog from 'components/common/Dialog'
import SearchInput from './SearchInput'
import UsersFoundList from './UsersFoundList'
import CurrentUsers from './CurrentUsers'
import Footer from './Footer'
import AppContext from 'contexts/app'
import { usersFoundReducer } from 'reducers/usersFoundReducer'
import mapKeyAndFn from 'utils/htmlElements/mapKeyAndFn'
import type { UserLookUpFC } from 'types/components/userLookup'

const UserLookUp:UserLookUpFC = ({show, isAdding = false, chatId, onClose, keyword}) => {
  const {chat, user} = useContext(AppContext)
  const [input, setInput] = useState<string>(keyword ? keyword : '')
  const [usersFound, updateUsersFound] = useReducer(usersFoundReducer,{list:[], count: 0})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const changeInput = (e:React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)
  const fetchSearch = useCallback(async() => {
    if (!input.length) return
    setIsLoading(true)
    const data =
      await fetch('/api/search', {
        method: 'POST',
        body: JSON.stringify({ type: 'user', keyword: input })
      })
      .then(res => res.json())
    setIsLoading(false)
    updateUsersFound({
      type: 'set',
      value: data.searchResult.map((user: {username:string}) => ({username: user.username, added: false}))
    })
  }, [input])
  useEffect(() =>{
    if (show) fetchSearch()
  }, [show])
  useEffect(() => {
    if(keyword) setInput(keyword)
  }, [keyword]) 

const closeDialog = () => {
  setInput('')
  onClose()
}

  useEffect(() => {
    const removeEnterEvent = mapKeyAndFn('Enter', () => { fetchSearch() })
    const removeEscEvent = mapKeyAndFn('Escape', () => searchRef.current?.blur())
    return () => {
      removeEnterEvent()
      removeEscEvent()
    }
  }, [input])  
  
  return (
    <Dialog show={show} onClose={closeDialog}>
      <SearchInput
        input={input}
        searchRef={searchRef}
        changeInput={changeInput}
        fetchSearch={fetchSearch}
      />
      <UsersFoundList
        isLoading={isLoading}
        usersFound={usersFound}
        updateUsersFound={updateUsersFound}
      />
      {isAdding && chatId ? <CurrentUsers
        username={user.username}
        currentChat={chat.list.items.get(chatId)}
      /> : null}
      <Footer
        chat={chat}
        usersFound={usersFound}
        onClose={closeDialog}
      />
    </Dialog>
  )
}

export default UserLookUp
