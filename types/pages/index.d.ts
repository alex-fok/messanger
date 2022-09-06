import { ChatMeta } from '../global'

export type Payload = {
  username: string,
  jwt:string
} | null 

export type ServerSideProps = {
  props: {
    data: {
      username: string,
      jwt:string,
      chats: Record<string, ChatMeta>
    }
  }
} | {
  redirect: {
    destination: string,
    permanent: boolean
  }
}
