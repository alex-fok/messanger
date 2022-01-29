import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef, useState, useContext, SyntheticEvent } from 'react'
import mapKeyAndFn from '../utils/htmlElements/mapKeyAndFn'
import UserLookUpModal from './UserLookUpModal'
import type {ContextType} from '../types/context'
import Context from '../lib/contexts'

const Navbar = () => {
  const {search} = useContext<ContextType>(Context)
  const {keyword, setKeyword} = search
  const [isSearching, setIsSearching] = useState<boolean>(false)
  const [isSearchFocused, setSearchFocused] = useState<boolean>(false)
  const [isLoggingOut, setIsLoggingOut] = useState<boolean>(false)
  const searchRef = useRef<HTMLInputElement>(null)
  
  const hideModal = (type:'search' | 'logout') => ({
    'search': () => {setIsSearching(false)},
    'logout': () => {setIsLoggingOut(false)}
  }[type]())

  const searchUser = () => {
    if (keyword === '') return
    searchRef.current?.blur()
    setIsSearching(true)
    setSearchFocused(false)
  }
  const searchInputEvents = {
    change: (e: React.ChangeEvent<HTMLInputElement>): void => setKeyword(e.target.value),
    focus: (): void => setSearchFocused(true),
    blur: (e: React.FocusEvent<HTMLInputElement>): void => {
      if(!e.currentTarget.parentElement?.contains(e.relatedTarget as Element))
        setSearchFocused(false)
    }
  }

  useEffect(() => {
    if (!isSearchFocused) return
    const enterKeyMap = mapKeyAndFn('Enter', searchUser)
    const escKeyMap = mapKeyAndFn('Escape', () => {
      searchRef.current?.blur()
      setSearchFocused(false)
    })
    return () => {
      enterKeyMap()
      escKeyMap()
    }
    
  }, [isSearchFocused, keyword])

  return (
    <>
      { isSearching 
        ? <UserLookUpModal
            hideContent={() => {hideModal('search')}} 
            keyword={keyword}
            setKeyword={setKeyword}
          />
        : null }
      
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
            onChange={searchInputEvents.change}
            onFocus={searchInputEvents.focus}
            onBlur={searchInputEvents.blur}
          />
        </div>
        <div className='px-3 flex items-center hover:text-gray-200 cursor-pointer'>
          <FontAwesomeIcon className='text-lg' icon={['fas', 'sign-out-alt']}/><span className='ml-2'>Sign Out</span>
        </div>
      </nav>
    </>
  )
}
export default Navbar
