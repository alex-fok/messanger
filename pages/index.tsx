import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import cookie from 'cookie'
import React from 'react'

import Layout from '../components/Layout'
import SideNav from '../components/SideNav'
import Conversation from '../components/Conversation'
import getUser from '../lib/user'

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
      data: await getUser(jwt),
    }
  }
}

const Home = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      {console.log('data: ', data)}
      <div className='w-full flex flex-grow flex-col'>
        <div className='flex flex-row h-5/6'>
          <SideNav />
          <Conversation/>
        </div>
      </div>
    </Layout>
  )
}
export default Home;
