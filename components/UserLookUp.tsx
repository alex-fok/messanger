import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useReducer, useRef, useState, useContext, useCallback, useMemo } from 'react'
import mapKeyAndFn from '../utils/htmlElements/mapKeyAndFn'
import Context from '../contexts/app'
import Dialog from './common/Dialog'
import { usersFoundReducer } from '../reducers/usersFoundReducer'
import { getNewVal } from '../utils/valGenerator'

import type {
  AppContext,
  SearchInputFC,
  UserActionIconFC,
  UserLookUpFC,
  UsersFoundListFC,
  CurrentUsersFC,
  FooterFC
 } from '../types/components/userLookup'

const UserActionIcon:UserActionIconFC = ({type, action}) => {
  switch(type) {
    case 'remove':
      return (
        <FontAwesomeIcon
          className='font-light text-sm cursor-pointer hover:text-red-500'
          icon={['fas', 'times']}
          onClick={action}
        />
      )
    case 'add':
    default:
      return (
        <FontAwesomeIcon
          className='font-light text-sm cursor-pointer hover:text-green-500'
          icon={['fas', 'plus']}
          onClick={action}
        />
      )
  }
} 
const SearchInput:SearchInputFC = ({input, searchRef, changeInput, fetchSearch}) => 
  <>
    <label className='font-light' htmlFor='searchUserInputModal'>Search Users:</label>
    <div className='mx-2 my-1 flex flex-row'>
      <input
        className='flex-grow mb-2 px-1 w-auto border border-gray-300 rounded'
        type='text'
        id='searchUserInputModal'
        value={input}
        ref={searchRef}
        onChange={changeInput}
        key='text'
      />
      <div
        className='px-3 cursor-pointer font-light text-gray-500 hover:text-gray-400'
        tabIndex={0}
        onClick={fetchSearch}
      ><FontAwesomeIcon icon={['fas', 'search']}/>
      </div>
    </div>
  </>

const UsersFoundList:UsersFoundListFC = ({isLoading, usersFound, updateUsersFound}) => {
  const userslist =
    <div className='my-2 border border-gray-300 rounded'>
      { usersFound.list.map((user, i) =>
        <li
          key={user.username}
          className='p-2 gap-2 grid grid-cols-12 items-center hover:bg-gray-200'
        >
          <FontAwesomeIcon icon={['fas', 'user']}/>
          <span className='cursor-default col-span-1'>
            { user.added
              ? <FontAwesomeIcon className='text-green-700' icon={['fas', 'check-circle']}/>
              : null }
          </span>
          <span className='cursor-default col-span-9'>{' '}{user.username} 
          </span>
          <UserActionIcon
            type={user.added ? 'remove' : 'add'}
            action= {() => updateUsersFound({type: user.added ? 'remove' : 'add', index: i})}
          />
        </li>
      )}
    </div>
  const textEl = (text:string) => <p className='text-gray-400 p-4 text-lg text-center'>{text}</p>
  return (
    isLoading
      ? textEl('Loading...')
      : usersFound.list.length
        ? userslist 
        : textEl('No Results')
  )
}

const CurrentUsers: CurrentUsersFC = ({username, currentChat}) => {
  if (!currentChat) return null
  return (
    <>
      <div className='font-light text-sm mb-2'>Added Users:</div>
        <div className='flex ml-2'>
        { currentChat.participants.filter(p => p !== username).map(user => 
          <div
            key={user}
            className='border border-gray-400 px-2 py-1 m-1 rounded text-xs font-light'
          >{user}
          </div>
        )}
      </div>
    </>
  ) 
}

const Footer:FooterFC = ({chat, usersFound, onClose}) => {
  const {user} = useContext<AppContext>(Context)
  const {dispatchActive, dispatchList} = useMemo(() => ({
    dispatchActive: chat.dispatchActive,
    dispatchList: chat.dispatchList
  }), [chat])

  const createTmp = () => {
    const tmpId = `tmp_${getNewVal()}`
    const participants = [user.username, ...usersFound.list.filter(users => users.added).map(users => users.username)]
    dispatchActive({
      type:'createTmp',
      participants,
      tmpId
    })
    dispatchList({
      type:'addTmpChat',
      participants,
      tmpId
    })
    onClose()
  }

  return (
    <div className='px-2 py-1 font-light self-end'>
      <button
        className={`px-2 py-1 rounded font-light disabled:text-gray-300 ${usersFound.count === 0 ? 'cursor-auto' : 'cursor-pointer hover:underline'}`}
        onClick={createTmp}
        disabled={usersFound.count === 0}
      >Create Chat</button>
      <button
        className='px-2 py-1 rounded font-light disabled:text-gray-300 hover:underline'
        onClick={onClose}
      >Close</button>
    </div>
  )
}

const UserLookUp:UserLookUpFC = ({show, isAdding = false, chatId, onClose, keyword}) => {
  const {chat, user} = useContext<AppContext>(Context)
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
