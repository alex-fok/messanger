import { FormEventHandler, useContext, useState, useMemo } from 'react'
import autoResizeTextArea from '../../utils/htmlElements/autoResizeTextArea'
import AppContext from '../../contexts/app'
import ChatContainer from './ChatContainer'
import ChatHistory from './ChatHistory'
import ChatOptions from './ChatOptions'
import UserInputArea from './UserInputArea'
import type { ChatFC } from '../../types/components/chat'

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
