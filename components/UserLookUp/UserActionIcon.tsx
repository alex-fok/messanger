import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { UserActionIconFC } from 'types/components/userLookup'

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

export default UserActionIcon
