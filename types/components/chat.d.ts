import type { FC, FormEventHandler } from 'react'
import type { ActiveChatType, Message } from '../contexts/app'

export type ChatFC = FC<{
  selected:ActiveChatType
}>
export type Message = Message
export type UserInputAreaFC = FC<{
  userInputHandler: FormEventHandler<HTMLTextAreaElement>
  message: string,
  sendMessage: () => void
}>
