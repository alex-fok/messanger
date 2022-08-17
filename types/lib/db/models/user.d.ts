import { ObjectId } from 'mongodb'
import type { ChatMeta } from '../../../global'

export default class User {
  constructor(
    public username:string,
    public password:string,
    public nickname:string,
    public lastModified: number,
    public chats:Record<string, ChatMeta> = {},
    public _id:ObjectId = new ObjectId()) {}
}

