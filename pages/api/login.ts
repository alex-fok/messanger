import { NextApiRequest, NextApiResponse } from 'next'
import loginHandler from '../../handler/login'

export default function login(req:NextApiRequest, res:NextApiResponse) {
  loginHandler(req.body.username, req.body.password)
  .then(jwt => {
    res.json({ jwt })
  })
  .catch(error => {
    res.status(418).end()
  })
} 
