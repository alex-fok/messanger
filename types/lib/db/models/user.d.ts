import { ObjectId } from 'mongodb'
import { ChatMetaDB } from '../../../global'

interface User {
  username:string,
  password:string,
  nickname:string,
  lastModified:number,
  chats:Record<string, ChatMetaDB>,
  _id:ObjectId
}

export { ChatMetaDB, User }
