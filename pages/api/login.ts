import { NextApiRequest, NextApiResponse } from 'next'
import dbLogin from '../../lib/db/login'

export default function login(req:NextApiRequest, res:NextApiResponse) {
  return new Promise<void> (resolve => {
    dbLogin(req.body.username, req.body.password)
    .then(jwt => {
      res.json({ jwt })
      resolve()
    })
    .catch(error => {
      res.status(401).end()
      resolve()
    })
  })
} 
