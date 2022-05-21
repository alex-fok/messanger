import {ObjectId} from 'mongodb'

type Chat = {
  name:string,
  unread: number
}

export default class User {
  constructor(
    public username:string,
    public password:string,
    public nickname:string,
    public lastModified: number,
    public chats:Record<string, Chat> = {},
    public _id:ObjectId = new ObjectId()) {}
}
