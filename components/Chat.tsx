import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, FormEvent, useState } from 'react'
import autoResizeTextArea from '../utils/htmlElements/autoResizeTextArea'
import type { ActiveChatType } from '../types/context'
type ChatFC = FC<{
  chat:ActiveChatType,
  addMessage: (message:string)=>void,
  createChat: (message:string)=>void
}>
const printTime = (timestamp:number):string => {
  const dateString = new Date(timestamp).toJSON()
  const index = dateString.indexOf('T')
  return `(${dateString.substring(0, index)} ${dateString.substring(index + 1, index + 6)})`
}

const Chat:ChatFC = ({chat, addMessage, createChat}) => {
  const [message, setMessage] = useState<string>('')
  const sendMessage = () => {
    chat.id === '-1' ? createChat(message) : addMessage(message)
    setMessage('')
  }

  const userInputHandler = (event: FormEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement
    setMessage(target.value)
    autoResizeTextArea(target)
  }

  return (
    <div className='w-5/6 sm:w-3/4 pt-6 pb-12 pr-12 md:pr-36 lg:pr-48 flex flex-col h-full'>
      <ul className='rounded-md border-2 border-gray-300 h-full focus:outline-none px-4 py-4 overflow-hidden overflow-y-scroll'>
        {chat.history.map((msgObj, i) => {
          return (
            <li
              className='py-2 mb-3'
              key={i}
            >
              <p className='mb-3'>{msgObj.sender.displayName} <span className='text-xs font-thin'>{msgObj.timestamp ? printTime(msgObj.timestamp) : 'Sending...'}:</span></p>
              <p className='rounded-md border border-gray-400 inline-block py-2 px-4'>
                <span>{msgObj.message}</span>
              </p>
            </li>
          )
        })}
      </ul>
      <div className='flex flex-row text-gray-400'>
        <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>File</button> 
        <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>Settings</button>
        <button className='rounded-sm px-2 py-1 hover:bg-gray-200'>Emoji</button>
      </div>
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
    </div>
  )
}
export default Chat
