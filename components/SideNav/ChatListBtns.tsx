import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Button from '../common/Button'
import type { ChatListBtnsFC } from '../../types/components/sideNav'

const ChatListBtns:ChatListBtnsFC = ({isVisible, setActive, addUser: addUser, deleteChat}) => {
  return (
    <div className={`flex flex-row justify-between px-6 ${isVisible ? 'visible' : 'invisible'}`}>
      <Button
        className='grow hover:text-cyan-600'
        onClick={setActive}
      ><FontAwesomeIcon icon={['fas', 'comments']} />
      </Button>
      <Button
        className='grow border-l border-gray-400 hover:text-green-600'
        onClick={addUser}
      ><FontAwesomeIcon icon={['fas', 'user-plus']} />
      </Button>
      <Button
        className='grow border-l border-gray-400 hover:text-red-700'
        onClick={deleteChat}
      ><FontAwesomeIcon icon={['fas', 'x']} />
      </Button>
    </div>
  )
}

export default ChatListBtns
