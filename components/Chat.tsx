import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, FormEventHandler, useContext, useEffect, useState, useMemo, useRef } from 'react'
import autoResizeTextArea from '../utils/htmlElements/autoResizeTextArea'
import AppContext from '../contexts/app'
import type { UserInputAreaFC, ChatFC } from '../types/components/chat'
import type { Message } from '../types/global'
import mapKeyAndFn from '../utils/htmlElements/mapKeyAndFn'

const printTime = (timestamp:number):string => {
  const dateString = new Date(timestamp).toJSON()
  const index = dateString.indexOf('T')
  return `(${dateString.substring(0, index)} ${dateString.substring(index + 1, index + 6)})`
}

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

const ChatOptions = () => {
  return (
    <div className='flex flex-row text-gray-400'>
      <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>File</button> 
      <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>Settings</button>
      <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>Emoji</button>
    </div>
  )
}

const ChatHistory:FC<{history: Message[]}> = ({history}) => {
  const ulRef = useRef<HTMLUListElement>(null)
  useEffect(() => {
    const ulEl = ulRef.current
    if (!ulEl) return
    ulEl.scrollTop = ulEl.scrollHeight
  }, [history])
  return (
    <ul
      className='rounded-md border-2 border-gray-300 h-full focus:outline-none px-4 py-4 overflow-hidden overflow-y-scroll'
      ref={ulRef}
    >
      {history.map((msgObj, i) => 
        <li
          className='py-2 mb-3'
          key={i}
        >
          <p className='mb-3'>
            {msgObj.sender}
            <span className='text-xs font-thin'>
            {msgObj.timestamp ? printTime(msgObj.timestamp) : 'Sending...'}:
            </span>
          </p>
          <p className='rounded-md border border-gray-400 inline-block py-2 px-4'>
            <span>{msgObj.message}</span>
          </p>
        </li>
      )}
    </ul>
  )
}

const ChatContainer:FC = ({children}) => {
  return (
    <div className='w-5/6 sm:w-3/4 pt-6 pb-12 pr-12 md:pr-36 lg:pr-48 flex flex-col h-full'>
      {children}
    </div>
  )
}

const Chat:ChatFC = ({selected}) => {
  const [message, setMessage] = useState<string>('')
  const {chat, user, socket} = useContext(AppContext)
  const [dispatchActive] = useMemo(() => [chat.dispatchActive, chat.dispatchList], [chat])

  const sendMessage = () => {
    if (message === '') return
    const {id, history, participants} = chat.active
    dispatchActive({type: 'addMsg', user:user.username, message})

    selected.history.length
      ? socket.emit('message', history.length, id, message)
      : socket.emit('createChat', id, participants, message)

    setMessage('')
  }

  const userInputHandler:FormEventHandler<HTMLTextAreaElement> = ({currentTarget}) => {
    setMessage(currentTarget.value)
    autoResizeTextArea(currentTarget)
  }

  return (
    <ChatContainer>
      <ChatHistory history={selected.history} />
      <ChatOptions />
      <UserInputArea
        userInputHandler={userInputHandler}
        message={message}
        sendMessage={sendMessage}
      />
    </ChatContainer>
  )
}
export default Chat
