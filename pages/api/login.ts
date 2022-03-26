import { NextApiRequest, NextApiResponse } from 'next'
import dbLogin from '../../lib/db/login'

const login = async (req:NextApiRequest, res:NextApiResponse) => {
  try {
    const {jwt} = await dbLogin(req.body.username, req.body.password).catch(err => {throw(err)})
    return res.json({jwt})
  } catch(err) {
    return res.status(401).end()
  }
} 
export default login
