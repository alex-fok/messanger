import { FC, FormEventHandler, useState } from 'react'
import { ActiveChatType, Message } from '../contexts/app'
export type ChatFC = FC<{
  selected:ActiveChatType
}>
export type Message = Message
export type UserInputAreaFC = FC<{
  userInputHandler: FormEventHandler<HTMLTextAreaElement>
  message: string,
  sendMessage: () => void
}>
