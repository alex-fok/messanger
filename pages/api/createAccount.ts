import { NextApiRequest, NextApiResponse } from 'next'
import dbCreateAccount from '../../lib/db/createAccount'
import serializeToken from '../../lib/authentication/serializeToken'

const createAccount = async (req:NextApiRequest, res: NextApiResponse) => {
  const {username, password, nickname} = req.body
  dbCreateAccount({username, password, nickname}).then(async(status) => {
    res.json({
      jwt: await serializeToken({username})
    })
  }).catch(error => {
    res.json({error})
  })
}
export default createAccount
