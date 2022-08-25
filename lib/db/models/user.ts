import { ObjectId } from 'mongodb'
import type { ChatMeta, User as UserInterface } from '../../../types/lib/db/models/user'

export default class User implements UserInterface {
  constructor(
    public username:string,
    public password:string,
    public nickname:string,
    public lastModified: number,
    public chats:Record<string, ChatMeta> = {},
    public _id:ObjectId = new ObjectId()) {}
}
