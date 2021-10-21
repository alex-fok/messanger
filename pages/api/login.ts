import { NextApiRequest, NextApiResponse } from 'next'
import dbLogin from '../../lib/db/login'

const login = async (req:NextApiRequest, res:NextApiResponse) => {
  const loginStatus = await dbLogin(req.body.username, req.body.password)
  if ('error' in loginStatus) return res.status(401).end()

  return res.json({ jwt: loginStatus.jwt })
} 
export default login
