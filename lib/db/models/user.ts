import {ObjectId} from 'mongodb'

export type ChatsType = {
  unread: number
}

export default class User {
  constructor(
    public username:string,
    public password:string,
    public nickname:string,
    public lastModified: number,
    public chats:Record<string, ChatsType> = {},
    public _id:ObjectId = new ObjectId()) {}
}
