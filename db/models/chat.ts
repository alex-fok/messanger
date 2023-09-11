
import { ObjectId } from 'mongodb'
import { Chat as ChatInterface, Message } from 'types/db/models/chat'

export default class Chat implements ChatInterface {
  constructor(
    public participants: ObjectId[],
    public history: Message[],
    public _id: ObjectId = new ObjectId()
  ){}
}
