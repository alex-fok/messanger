import type { Message } from global
import type { ObjectId } from 'mongodb'
import type Chat from './models/chat'

export type FindChat = (chatId:ObjectId, userId:objectId) => Promise<Chat>

export type AddMessage = (sender:ObjectId, chatId:ObjectId, message:string) => Promise<{
  timestamp: number,
  sender: string,
  message: string
}>

export type CreateChat = (requesterId: Objectid, participants: string[], message: string) => Promise<{
  timestamp: number,
  chatId: ObjectId,
  participantIds: ObjectId[]
}>

export type GetChat = (chatId:ObjectId, userId:ObjectId) => Promise<{
  history: Message[],
  participants: string[]
}>

export type GetParticipants = (chatId:ObjectId, userId:ObjectId) => Promise<{participants: string[]}>

export type RemoveUser = (chatId:ObjectId, userId:ObjectId) => Promise<{acknowledged: boolean}>

export type RemoveChat = (chatId:ObjectId, userId:ObjectId) => Promise<{
  acknowledged: boolean,
  chatId: ObjectId,
  participants: ObjectId[]
}>
