import { NextApiRequest, NextApiResponse } from 'next'
import User from '../../lib/db/user'
import serializeToken from '../../lib/auth/serializeToken'
import validateInput from '../../utils/validateInput'

const createAccount = async (req:NextApiRequest, res: NextApiResponse) => {
  const {username, password, nickname} = req.body

  const [isUserValid, userError] = validateInput({name: 'Username', value: username}, ['atLeast3'])
  const [isPassValid, passError] = validateInput({name: 'Password', value: password}, ['atLeast8'])
  const [isNickValid, nickError] = nickname === username
    ? [isUserValid, userError] 
    : validateInput({name: 'Nickname', value: nickname}, ['atLeast3OrEmpty'])

  const inputValidationError =
    (!isUserValid && userError) ||
    (!isPassValid && passError) ||
    (!isNickValid && nickError) || ''

  if (inputValidationError.length) return res.json({ error: inputValidationError })

  User.create(username, password, nickname).then(async() => {
    res.json({
      jwt: await serializeToken({username})
    })
  }).catch(error => {
    res.json(error)
  })
}
export default createAccount
