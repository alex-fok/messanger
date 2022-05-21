import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import axios from 'axios'
import { FC, useEffect, useReducer, useRef, useState, useContext } from 'react'
import { cloneDeep } from 'lodash'
import mapKeyAndFn from '../utils/htmlElements/mapKeyAndFn'
import Context from '../contexts/app'
import type { UserListEl, ContextType, UserLookUpPropType } from '../types/components/userLookup'

type ActionType = {type:'set', value:UserListEl[]} | {type:'add' | 'remove', index:number}

type UsersFoundState = {list:UserListEl[], count:number}

const usersFoundReducer = (state:UsersFoundState, action:ActionType):UsersFoundState => {
  if (action.type === 'set' && action.value) return {list: action.value, count:0}
  const copy = cloneDeep(state)
  switch (action.type) {
    case 'add':
      copy.list[action.index].added = true
      copy.count++
      break
    case 'remove':
      copy.list[action.index].added = false
      copy.count--
      break
  }
  return copy
}

const UserLookUpModal:FC<UserLookUpPropType> = ({hideContent, keyword, setKeyword}) => {
  const {chat} = useContext<ContextType>(Context)
  const {dispatchActive : dispatchActiveChat} = chat
  const [input, setInput] = useState<string>(keyword)
  const [usersFound, updateUsersFound] = useReducer(usersFoundReducer,{list:[], count: 0})
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const searchRef = useRef<HTMLInputElement>(null)

  const changeInput = (e:React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)
  const updateKeyword = () => setKeyword(input)

  useEffect(() => {
    if (keyword === '') return
    (async() => {
      const {data} = await axios({
        method: 'POST',
        url: `/api/search`,
        data: { type: 'user', keyword }
      })
      setIsLoading(false)
      updateUsersFound({
        type: 'set',
        value: data.searchResult.map((user: {username:string}) => ({username: user.username, added: false}))
      })
    })()
  }, [keyword])

  useEffect(() => {
    const removeEnterEvent = mapKeyAndFn('Enter', () => setKeyword(input))
    const remvoeEscEvent = mapKeyAndFn('Escape', () => searchRef.current?.blur())
    return () => {
      removeEnterEvent()
      remvoeEscEvent()
    }
  }, [input])

  const UserActionIcon = (added:boolean, index:number) => added 
    ? <FontAwesomeIcon
        className='font-light text-sm cursor-pointer hover:text-red-500'
        icon={['fas', 'times']}
        onClick={() => updateUsersFound({type: 'remove', index})}
      />
    : <FontAwesomeIcon
        className='font-light text-sm cursor-pointer hover:text-green-500'
        icon={['fas', 'plus']}
        onClick={() => updateUsersFound({type: 'add', index})}
      />
  
  return (
    <div className='flex fixed inset-0 items-center justify-center z-10 sm:p-4 bg-gray-800 bg-opacity-50' onClick={hideContent}>
      <article className='flex flex-col inline-block w-96 px-5 py-3 rounded-md bg-gray-100' onClick={e => e.stopPropagation()}>
        <span className='my-2 self-end font-thin text-3xl leading-5 cursor-pointer' onClick={hideContent}>&times;</span>
        <label className='font-light' htmlFor='searchUserInputModal'>Search Users:</label>
        <div className='mx-2 my-1 flex flex-row'>
          <input
            className='flex-grow mb-2 px-1 w-auto border border-gray-300 rounded'
            type='text'
            id='searchUserInputModal'
            value={input}
            ref={searchRef}
            onChange={changeInput}
          />
          <div
            className='px-3 cursor-pointer font-light text-gray-500 hover:text-gray-400'
            onClick={updateKeyword}
            tabIndex={0}
          ><FontAwesomeIcon icon={['fas', 'search']}/>
          </div>
        </div>
        { usersFound.list.length > 0
          ? <div className='my-2 border border-gray-300 rounded'>
            { usersFound.list.map((user, i) => {
              return (
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
                  {UserActionIcon(user.added, i)}
                </li>
              )
            })}
            </div>
          : <p className='text-gray-400 p-4 text-lg text-center'>{isLoading ? 'Loading...' : 'No Results'}</p>
        }
        <div className='px-2 py-1 font-light self-end'>
          <button
            className={`px-2 py-1 rounded font-light disabled:text-gray-300 ${usersFound.count === 0 ? 'cursor-auto' : 'cursor-pointer hover:underline'}`}
            onClick={() => {
              dispatchActiveChat({ type: 'addChat', participants:usersFound.list.map(user => user.username) })
            }}
            disabled={usersFound.count === 0}
          >Create Chat</button>
          <button
            className='px-2 py-1 rounded font-light disabled:text-gray-300 hover:underline'
            onClick={hideContent}
          >Close</button>
        </div>
      </article>
    </div>
  )
}
export default UserLookUpModal
