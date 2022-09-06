import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import type {Payload, ServerSideProps} from '../types/pages'
import getJwtPayload from '../lib/auth/getJwtPayload'
import dbUser from '../lib/db/user'
import App from '../components/App'
import type { FC } from 'react'

export async function getServerSideProps(context:GetServerSidePropsContext):Promise<ServerSideProps> {
  const payload:Payload = await getJwtPayload(context.req.headers.cookie)
    return payload ? {
      props: {
        data: {
          username:payload.username,
          jwt:payload.jwt,
          chats: (await dbUser.get(payload.username))?.chats || {}
        }
      }
    } : {
    redirect: {
      destination: '/login',
      permanent: false
    }
  }
}

const Home: FC<InferGetServerSidePropsType<typeof getServerSideProps>> = ({data}) => <App data={data}/>
export default Home
