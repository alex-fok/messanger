import { FC, FormEventHandler, useState } from 'react'
import { ActiveChatType, Message } from '../contexts'
export type ChatFC = FC<{
  chat:ActiveChatType,
  addMessage: (message:string)=>void,
  createChat: (message:string)=>void
}>
export type Message = Message
export type UserInputAreaFC = FC<{
  userInputHandler: FormEventHandler<HTMLTextAreaElement>
  message: string,
  sendMessage: () => void
}>
