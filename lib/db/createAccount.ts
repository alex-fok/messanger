import mongodb from './mongodb'
import validateInput from '../../utils/validateInput'
import crypto from 'crypto'

type CreateAccountInput = Record<'username' | 'password' | 'nickname', string>

type SuccessType = {
  success: string
}
type ErrorType = {
  error: string
}
type CreateAccountType = SuccessType | ErrorType

const createAccount = async ({username, password, nickname}: CreateAccountInput) => {
  const client = await mongodb
  const db = client.db()
  
  const byname = nickname.length === 0 ? username : nickname

  const inputsAreValid = 
    validateInput(username, ['atLeast3']) 
    && validateInput(password, ['atLeast8'])
    && (byname === username || validateInput(byname, ['atLeast3']))
    
  if (!inputsAreValid){
    return new Promise<CreateAccountType>((res, rej) => rej({
      error: 'User input does not meet requirement'
    }))
  }

  if(await db.collection('user').findOne({username})){
    return new Promise<CreateAccountType>((res, rej) => rej({
      error: 'Username already existed'
    }))
  }

  const statusPromise = new Promise<CreateAccountType>((res, rej) => {
    const salt = crypto.randomBytes(8).toString('hex')
    crypto.scrypt(password, salt, 64, async (err, derivedKey) => {
      if (err) return rej({ error: 'Error in password encryption' })

      const {acknowledged} = await db.collection('user').insertOne({
        username,
        password: `${salt}.${derivedKey.toString('hex')}`,
        nickname: byname })

      acknowledged
        ? res({ success: 'User account created' })
        : rej({ error: 'Error creating user account'})
    })
  })
  return statusPromise
}
export default createAccount
