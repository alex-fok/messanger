import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { SearchInputFC } from '../../types/components/userLookup'

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

export default SearchInput
