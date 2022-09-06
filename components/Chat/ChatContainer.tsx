import type { FC } from 'react'

const ChatContainer:FC = ({children}) => {
  return (
    <div className='w-5/6 sm:w-3/4 pt-6 pb-12 pr-12 md:pr-36 lg:pr-48 flex flex-col h-full'>
      {children}
    </div>
  )
}
export default ChatContainer
