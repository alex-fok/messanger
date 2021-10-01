import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Login = () => {
  const [username, setUserName] = useState('username')
  const [password, setPassword] = useState('password')
  const [invalidCred, setInvalidCred] = useState(false)
  
  const router = useRouter()

  const processLogin = () => {
    axios({
      method: 'post',
      url: 'api/login',
      data: { username, password }
    })
    .then(res => {
      document.cookie = res.data.jwt
      router.push('/')
    })
    .catch(err => {
      setInvalidCred(true)
    })
  }
  useEffect(() => {
    router.prefetch('/')
    
  },[])

  const errorMsg = () => {
    return <div className='text-red-600 p-2'>ERROR: Invalid Credentials</div>
  }
  return (
    <div className='w-100 h-screen flex items-center bg-gray-400'>  
      <Head>
        <title>Sign In</title>
      </Head>
      <article className='w-96 h-64 m-auto border-2 rounded-md flex flex-col bg-gray-100 justify-center p-4'>
        <h1 className='m-2 text-xl font-semibold'>SIGN IN</h1>
        <section className='p-4'>
          <label className='mr-3 font-light' htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' onChange={e => setUserName(e.currentTarget.value)}/>
        </section>
        <section className='p-4'>
          <label className='mr-3 font-light' htmlFor='password'>Password</label>
          <input type='password' id='password' onChange={e => setPassword(e.currentTarget.value)}/>
        </section>
        {invalidCred ? errorMsg() : null}
        <button className='self-center py-1 px-2 bg-gray-200' onClick={processLogin}>Submit</button>
      </article>
    </div>
  )
}
export default Login
