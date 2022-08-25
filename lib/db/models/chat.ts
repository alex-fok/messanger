
import { ObjectId } from 'mongodb'
import { Chat as ChatInterface, Message } from '../../../types/lib/db/models/chat'

export default class Chat implements ChatInterface {
  constructor(
    public participants: ObjectId[],
    public history: Message[],
    public _id: ObjectId = new ObjectId()
  ){}
}
