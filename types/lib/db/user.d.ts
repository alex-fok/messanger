import { WithId } from 'mongodb'
import { User, ChatMeta } from '../../global'
import { User as UserDB } from '../db/models/user'
import { Chat as ChatDB } from '../db/models/chat'

export type ChatMeta = ChatMeta

export type Create = (username:string, password:string, nickname:string) => Promise<string>

export type Verify = (jwt:string) => Promise<string | null>

export type Get = (username:string) => Promise<User | null>

export type GetWithJwt = (jwt:string) => Promise<User | null>

export type Search = (username:string) => Promise<WithId<UserDB> | null>

export type GetChats = (username:string) => Promise<WithId<ChatDB>[]>
