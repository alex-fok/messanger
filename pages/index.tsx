import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import cookie from 'cookie'
import React from 'react'

import Layout from '../components/Layout'
import SideNav from '../components/SideNav'
import Conversation from '../components/Conversation'
import getUser from '../lib/db/user'
import mongodb from '../lib/db/mongodb'

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
      <div className='flex flex-row h-full'>
        <SideNav />
        <Conversation/>
      </div>
    </Layout>
  )
}
export default Home;
