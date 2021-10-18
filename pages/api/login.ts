import { NextApiRequest, NextApiResponse } from 'next'
import dbLogin from '../../lib/db/login'

const login = async (req:NextApiRequest, res:NextApiResponse) => {
  const { jwt, error } = await dbLogin(req.body.username, req.body.password)
  if (error) return res.status(401).end()

  return res.json({ jwt })
} 
export default login
