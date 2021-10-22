import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import axios from "axios"
import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react"
import mapKeyAndFn from "../utils/htmlElements/mapKeyAndFn"

type UserListEl = {
  username: string
}

type UserLookUpModalPropType = {
  hideContent: ()=>void,
  keyword: string,
  setKeyword: Dispatch<SetStateAction<string>>
}

const UserLookUpModal = ({hideContent, keyword, setKeyword}: UserLookUpModalPropType) => {
  const [searchBy, setSearchBy] = useState('')
  const [usersFound, setUsersFound] = useState<UserListEl[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [usersAdded, setUsersAdded] = useState<UserListEl[]>([])
  const searchRef = useRef<HTMLInputElement>(null)

  const addUser = (user : UserListEl) => {
    setUsersFound(prev => prev.filter(el => user.username !== el.username))
    setUsersAdded([...usersAdded, user])
  }
  const removeUser = (user: UserListEl) => {
    setUsersFound([user, ...usersFound])
    setUsersAdded(prev => prev.filter(el => user.username !== el.username))
  }

  useEffect(() => {
    (async () => {
      const {data} = await axios({
        method: 'POST',
        url: `/api/search`,
        data: { type: 'user', keyword }
      })
      setIsLoading(false)
      setUsersFound(data.searchResult)
    })()
  },[keyword])

  useEffect(()=> {
    const removeEnterEvent = mapKeyAndFn('Enter', () => setKeyword(searchBy))
    const remvoeEscEvent = mapKeyAndFn('Escape', () => searchRef.current?.blur())
    return () => {
      removeEnterEvent()
      remvoeEscEvent()
    }
  }, [searchBy])

  return (
    <div className='flex fixed inset-0 items-center justify-center z-10 sm:p-4 bg-gray-800 bg-opacity-50' onClick={hideContent}>
      <article className='flex flex-col inline-block w-96 px-5 py-3 rounded-md bg-gray-100' onClick={e => e.stopPropagation()}>
        <span className='my-2 self-end font-thin text-3xl leading-5 cursor-pointer' onClick={hideContent}>&times;</span>
        <label className='font-light' htmlFor='searchUserInputModal'>Search Users:</label>
        <div className='mx-2 my-1 flex flex-row'>
          <input
            className='flex-grow mb-2 w-auto border border-gray-300 rounded'
            type='text'
            id='searchUserInputModal'
            value={searchBy}
            ref={searchRef}
            onChange={e => setSearchBy(e.target.value)}
          />
          <div
            className='px-3 cursor-pointer font-light text-gray-500 hover:text-gray-400'
            onClick={()=>setKeyword(searchBy)}
            tabIndex={0}
          ><FontAwesomeIcon icon={['fas', 'search']}/>
          </div>
        </div>
        <p className='font-light'>Results:</p>
        { usersFound.length > 0
          ? <div className='m-2 border border-gray-300 rounded'>
            { usersFound.map((user) => 
              <li
                key={user.username}
                className='p-2 gap-2 flex flex-row items-center hover:bg-gray-200'
              >
                <FontAwesomeIcon icon={['fas', 'user']}/>
                <span className='cursor-default'>{user.username}</span>
                <FontAwesomeIcon
                  className='font-light text-sm cursor-pointer hover:text-green-500'
                  icon={['fas', 'plus']}
                  onClick={()=>addUser(user)}
                />
              </li>
            )}
            </div>
          : <p className='text-gray-400 p-4 text-lg text-center'>{isLoading ? 'Loading...' : 'No Results'}</p>
        }
        <div className='m-2'>
          <p className='mb-1 align-middle font-light'>Users added:</p>
          { usersAdded.length > 0
            ? usersAdded.map(user => 
              <span
                key={user.username}
                className='inline-block mr-2 mb-2 px-2 py-1 border border-gray-300 rounded cursor-default'
              >{user.username}
                <span className='pl-2'>
                  <FontAwesomeIcon
                    className='font-light text-sm cursor-pointer hover:text-green-500'
                    icon={['fas','minus']}
                    onClick={()=>removeUser(user)}
                  />
                </span>
              </span>)
            : <span className='text-gray-400 p-4 text-sm text-center'>None</span>
          }
        </div>
        <button
          className={`px-2 py-1 rounded font-light self-end disabled:text-gray-300 ${usersAdded.length ? 'hover:underline' : null}`}
          disabled={usersAdded.length === 0}
          onClick={()=>console.log('connect')}
        >Connect</button>
      </article>
    </div>
  )
}
export default UserLookUpModal
