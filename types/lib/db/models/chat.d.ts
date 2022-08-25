import { ObjectId } from 'mongodb'
import { Message } from '../../../global'

interface Chat {
  participants: ObjectId[],
  history: Message[],
  _id: ObjectId
}
export { Chat, Message }
