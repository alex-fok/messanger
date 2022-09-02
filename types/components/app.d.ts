import type {Message} from '../contexts/app'
type Chat = { 
  unread: number,
  name: string,
  participants: string[]
}
export type Message = Message
export type Data = {
  username: string,
  jwt:string,
  chats: Record<string, Chat>
}
