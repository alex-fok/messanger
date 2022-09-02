import { ObjectId } from "mongodb"

export type Message = {
  sender: string,
  timestamp: number | undefined,
  message: string
}

export interface ChatMeta {
  name:string,
  unread:number,
  participants: string[]
}

export interface ChatMetaDB extends ChatMeta {
  participants: ObjectId[]
}
