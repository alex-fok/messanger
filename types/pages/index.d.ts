type ChatsType = {
  unread: number,
  name: string
}

export type Payload = {
  username: string,
  jwt:string
} | null 

export type ServerSideProps = {
  props: {
    data: {
      username: string,
      jwt:string,
      chats: Record<string, ChatsType>
    }
  }
} | {
  redirect: {
    destination: string,
    permanent: boolean
  }
}
