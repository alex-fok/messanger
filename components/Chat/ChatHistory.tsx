import { useEffect, useRef } from 'react'
import type { FC } from 'react'
import type { Message } from 'types/global'

const printTime = (timestamp:number):string => {
  const dateString = new Date(timestamp).toJSON()
  const index = dateString.indexOf('T')
  return `(${dateString.substring(0, index)} ${dateString.substring(index + 1, index + 6)})`
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
export default ChatHistory
