import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState } from 'react'
import mapKeyAndFn from '../utils/htmlElements/mapKeyAndFn'
import UserLookUpModal from './UserLookUpModal'

const Navbar = () => {
  const [keyword, setKeyword] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [isSearchFocused, setSearchFocused] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  
  const hideModal = (type:'search' | 'logout') => (
    {
      'search': () => {setIsSearching(false)},
      'logout': () => {setIsLoggingOut(false)}
    }[type]())

  const searchUser = () => {
    searchRef.current?.blur()
    setIsSearching(true)
    setSearchFocused(false)
  }
  useEffect(() => {
    if (isSearchFocused) {
      const enterKeyMap = mapKeyAndFn('Enter', searchUser)
      const escKeyMap = mapKeyAndFn('Escape', () => {
        searchRef.current?.blur()
        setSearchFocused(false)
      })
      return () => {
        enterKeyMap()
        escKeyMap()
      }
    }
  }, [isSearchFocused])

  return (
    <>
      { isSearching ? <UserLookUpModal keyword={keyword} hideContent={() => {hideModal('search')}} /> : null}
      
      <nav className='top-0 w-screen flex flex-row bg-gray-900 pr-12 md:pr-36 lg:pr-48 py-5 justify-end text-gray-400'>        
        <div className='flex flex-row p-0'>
          <div
            className={`m-1 px-3 hover:text-gray-200 cursor-pointer ${!isSearchFocused ? 'hidden' : ''}`}
            tabIndex={0}
            onClick={searchUser}
          ><FontAwesomeIcon icon={['fas', 'search']}/>
          </div>
          <input
            className='px-2 py-1 rounded outline-none focus:border-gray-400 text-black'
            type='text'
            placeholder='Search for User...'
            ref={searchRef}
            value={keyword}
            onChange={e=> setKeyword(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={e => {
              if(!e.currentTarget.parentElement?.contains(e.relatedTarget as Element))
                setSearchFocused(false)
            }}
          />
        </div>
        <div className='px-3 flex items-center hover:text-gray-200'>Logout</div>
      </nav>
    </>
  )
}
export default Navbar
