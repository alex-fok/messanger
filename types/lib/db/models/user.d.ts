import { ObjectId } from 'mongodb'
import { ChatMeta } from '../../../global'

interface User {
  username:string,
  password:string,
  nickname:string,
  lastModified:number,
  chats:Record<string, ChatMeta>,
  _id:ObjectId
}

export { ChatMeta, User }
