import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import UserActionIcon from './UserActionIcon'
import type { UsersFoundListFC } from 'types/components/userLookup'

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

export default UsersFoundList
