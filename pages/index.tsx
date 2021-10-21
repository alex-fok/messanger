import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import React from 'react'

import Layout from '../components/Layout'
import SideNav from '../components/SideNav'
import Conversation from '../components/Conversation'
import getJwtPayload from '../lib/authentication/getJwtPayload'

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const payload = await getJwtPayload(context.req.headers.cookie)
  return payload ? {
    props: {
      data: payload
    }
  } : {
    redirect: {
      destination: '/login',
      permanent: false
    }
  }
}

const Home = ({data}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Layout>
      <div className='flex flex-row h-full'>
        <SideNav />
        <Conversation/>
      </div>
    </Layout>
  )
}
export default Home;
