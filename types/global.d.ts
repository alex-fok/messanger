export type Message = {
  sender: string,
  timestamp: number | undefined,
  message: string
}
export type ChatMeta = {
  name: string,
  unread: number
}
