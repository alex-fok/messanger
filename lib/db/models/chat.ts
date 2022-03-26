import {ObjectId} from 'mongodb'

interface MessageType {
  timestamp: number,
  sender: ObjectId,
  message: string
}

export default class Chat {
  constructor(
    public participants: ObjectId[],
    public history: MessageType[],
    public _id: ObjectId = new ObjectId()) {}
}
