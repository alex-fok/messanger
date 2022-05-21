import type {Message} from '../contexts'
type Chat = { 
  unread: number,
  name: string
}
export type Message = Message
export type Data = {
  username: string,
  jwt:string,
  chats: Record<string, Chat>
}
