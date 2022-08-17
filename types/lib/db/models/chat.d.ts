import { ObjectId } from 'mongodb'
import { Message } from '../../../global'

export default class Chat {
  constructor(
    public participants: ObjectId[],
    public history: Message[],
    public _id: ObjectId = new ObjectId()) {}
}
