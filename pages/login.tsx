import React, { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next'

import axios from 'axios'
import Router from 'next/router'
import Head from 'next/head'
import cookie from 'cookie'
import userHandler from '../lib/user'
import { FormContent, Field } from '../types/form'

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const {jwt} = cookie.parse(context.req.headers?.cookie || '')
  if (jwt) {
    const info = userHandler(jwt)
    console.log(info)
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  return {props: {}}
}

const useMode = (initMode: 'login' | 'signup') : 
  [string, FormContent, React.Dispatch<React.SetStateAction<'login' | 'signup'>>] => {
  const [username, setUserName] = useState('')
  const [nickname, setNickName] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState(initMode)

  const userField = {
    id: 'username',
    type: 'text',
    label: 'Username',
    value: username,
    onChange: setUserName
  }

  const nickField = {
    id: 'nickname',
    type: 'text',
    label: 'Nickname',
    value: nickname,
    onChange: setNickName
  }
  

  const passField = {
    id: 'password',
    type: 'password',
    label: 'Password',
    value: password,
    onChange: setPassword
  }

  const content: {[key: string]: FormContent} = {
    'login': {
      title: 'SIGN IN',
      values: { username, password },
      fields: [userField, passField]
    },
    'signup': {
      title: 'CREATE ACCOUNT',
      values: { username, nickname, password },
      fields: [userField, nickField, passField]
    }
  } 
  return [mode, content[mode], setMode]
}


const FormEl = (props: {field:Field}) => {
  return (
    <>
      <label className='font-light' htmlFor={props.field.id}>{props.field.label}</label>
      <input className='col-span-2 border border-gray-300 rounded' type={props.field.type} id={props.field.id} name={props.field.id} onChange={e => props.field.onChange(e.currentTarget.value)}/>
    </>
  )
}

const Login = () => {
  const [invalidCred, setInvalidCred] = useState(false)
  const [mode, content, setMode] = useMode('login')

  const processLogin = () => {
    axios({
      method: 'post',
      url: 'api/login',
      data: {
        username:content.values.username,
        password:content.values.password
      },
      withCredentials: true
    })
    .then(res => {
      document.cookie = res.data.jwt
      Router.push('/')
    })
    .catch(() => {
      setInvalidCred(true)
    })
  }

  const processRegistraion = () => {

  }
  useEffect(() => {
    Router.prefetch('/')
  },[])

  const errorMsg = () => {
    return <div className='text-red-600 p-2'>ERROR: Invalid Credentials</div>
  }

  return (
    <div className='w-100 flex flex-row h-screen items-center bg-gray-400'>
      <Head>
        <title>Sign In</title>
      </Head>
      <article className='w-96 m-auto p-4 rounded-md bg-gray-100 flex flex-col justify-center filter drop-shadow-xl'>
        <h1 className='m-2 text-xl font-semibold'>{content.title}</h1>
        <section className='p-4 grid grid-cols-3 gap-x-3 gap-y-5 mb-2'>
          {content.fields.map(field => {
            return (
              <FormEl field={field} key={field.id}/>
            )
          })}
        </section>
        <button className='align-center mx-auto mb-2 py-1 px-2 bg-gray-200 rounded' onClick={mode === 'login' ? processLogin : processRegistraion}>Submit</button>
        <a className='pl-2 text-blue-500 cursor-pointer' onClick={() => setMode(mode === 'login' ? 'signup': 'login')}>{ mode === 'signup' ? 'Sign in' : 'Create New Account'}</a>
        {invalidCred ? errorMsg() : null} 
      </article>
    </div>
  )
}
export default Login
