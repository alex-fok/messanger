import { ObjectId } from 'mongodb'
import { Message } from '../../../types/global'

export default class Chat {
  constructor(
    public participants: ObjectId[],
    public history: Message[],
    public _id: ObjectId = new ObjectId()) {}
}
