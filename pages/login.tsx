import React, { useEffect, useState } from 'react'
import { GetServerSidePropsContext } from 'next'

import axios from 'axios'
import Router from 'next/router'
import Head from 'next/head'
import cookie from 'cookie'
import userHandler from '../lib/user'
import { FormContent, Field } from '../types/form'
import validateInput from '../utils/validateInput'

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

const FieldsetEl = (props: {field:Field}) => {
  const {id, label, type, onChange, value} = props.field
  return (
    <>
      <label className='font-light' htmlFor={id}>{label}</label>
      <input
        className='col-span-2 border border-gray-300 rounded'
        type={type}
        id={id}
        name={id}
        onChange={e => onChange(e.currentTarget.value)}
        value={value}
      />
    </>
  )
}

const Login = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [mode, content, setMode] = useMode('login')

  const processLogin = () => {
    const {username, password} = content.values
    const [isUserValid, userError] = validateInput({name: 'Username', value: username}, ['atLeast3']) 
    const [isPassValid, passError] = validateInput({name: 'Password', value: password}, ['atLeast8'])

    const errorMsg = (!isUserValid && userError) || (!isPassValid && passError) || ''
    if (!isUserValid || !isPassValid) return setErrorMessage(errorMsg)

    axios({
      method: 'POST',
      url: '/api/login',
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
      setErrorMessage('Invalid Credentials')
    })
  }

  const processRegistraion = () => {
    const {username, password, nickname} = content.values
    const [isUserValid, userError] = validateInput({name: 'Username', value: username}, ['atLeast3'])
    const [isNickValid, nickError] = validateInput({name: 'Nickname', value: nickname}, ['atLeast3OrEmpty']) 
    const [isPassValid, passError] = validateInput({name: 'Password', value: password}, ['atLeast8'])

    const errorMsg = (!isUserValid && userError) || (!isPassValid && passError) || (!isNickValid && nickError) ||''
    if (errorMsg.length) return setErrorMessage(errorMsg)
    axios({
      method: 'POST',
      url: 'api/createAccount',
      data: {
        username: content.values.username,
        password: content.values.password,
        nickname: content.values.nickname
      }
    })
    .then(res => {
      if (res.data.error) setErrorMessage(res.data.error)
      document.cookie = res.data.jwt
      Router.push('/')
    })
    .catch(() => {
      setErrorMessage('Create Account Failed')
    })
  }
  useEffect(() => {
    Router.prefetch('/')
  },[])

  const changeMode = () => {
    setErrorMessage('')
    content.fields.forEach(field => {
      field.onChange('')
    })
    setMode(mode==='login' ? 'signup': 'login')
  }

  const displayErrorMessage = () => <p className='text-red-600 text-xs ml-4'>ERROR: {errorMessage}</p>

  return (
    <div className='w-100 flex flex-row h-screen items-center bg-gray-400'>
      <Head>
        <title>Sign In</title>
      </Head>
      <form
        className='w-96 m-auto p-4 rounded-md bg-gray-100 flex flex-col justify-center filter drop-shadow-xl'
        method='POST'
        onSubmit={e => {
          e.preventDefault() 
          mode === 'login' ? processLogin() : processRegistraion()}
        }
      >
        <h1 className='m-2 text-xl font-semibold'>{content.title}</h1>
        <fieldset className='m-4 grid grid-cols-3 gap-x-3 gap-y-5'>
          {content.fields.map(field => {
            return (
              <FieldsetEl field={field} key={field.id}/>
            )
          })}
        </fieldset>
        {errorMessage.length ? displayErrorMessage() : null} 
        <input className='align-center mx-auto rounded my-2 py-1 px-2 bg-gray-200 cursor-pointer' type='submit' value='Submit'/>
        <a
          className='ml-2 text-blue-500 text-xs font-light cursor-pointer mb-2'
          onClick={changeMode}
        >
          {mode === 'signup' ? 'Sign in' : 'Create New Account'}
        </a>
        
      </form>
    </div>
  )
}
export default Login
