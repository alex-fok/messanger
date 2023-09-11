import type { FC } from 'react'
import type { ChatMeta } from 'types/global'

type Data = {
  username: string,
  jwt:string,
  chats: Record<string, ChatMeta>
}

export type AppFC = FC<{data:Data}>
