import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Conversation from '../components/Conversation'
import Navbar from '../components/Navbar'
import SideNav from '../components/SideNav'
import cookie from 'cookie'
import getUserInfo from '../handler/user'

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const redirectToLogin = {
    redirect: {
      destination: '/login',
      permanent: false
    }
  }
  const headerCookie = context.req.headers.cookie

  const { jwt } = cookie.parse(headerCookie || '')
  if (!headerCookie || !jwt) return redirectToLogin
  
  return {
    props: {
      data: getUserInfo(jwt || ''),
      error: null
    }
  }
}

const Home = ({data, error}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className='flex flex-row'>
      {data ? console.log('data: ', data) : console.log('error: ', error)}
      <div className='h-screen w-100 flex flex-grow flex-col'>
        <Navbar />
        <div className='flex flex-row h-5/6'>
          <SideNav />
          <Conversation/>
        </div>
      </div>
    </div>
  )
}
export default Home;
