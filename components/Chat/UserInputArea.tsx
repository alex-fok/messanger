import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import mapKeyAndFn from '../../utils/htmlElements/mapKeyAndFn'

import type { UserInputAreaFC } from "../../types/components/chat"

const UserInputArea:UserInputAreaFC = ({userInputHandler, message, sendMessage}) => {
  useEffect(() => mapKeyAndFn('Enter', sendMessage), [sendMessage])

  return (
    <div className='flex flex-row item-stretch'>
      <textarea
        className='rounded-md resize-none w-11/12 border-2 border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent'
        style={{height: '32px'}}
        onInput={userInputHandler}
        value={message}
      ></textarea>
      <button
        className='rounded-md w-1/12 px-2 m-2 text-xl text-gray-500 hover:text-indigo-500'
        onClick={sendMessage}
      ><FontAwesomeIcon icon={['fas', 'paper-plane']}/>
      </button>
    </div>
  )
}

export default UserInputArea
