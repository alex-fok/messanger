import type { Message } from global
import type { ObjectId } from 'mongodb'

export type CreateChat = {
  timestamp: number,
  chatId: ObjectId,
  participantIds: ObjectId[]
}

export type GetChat = {
  history: Message[],
  participants: string[]
}
