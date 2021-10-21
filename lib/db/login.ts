import serializeToken from '../authentication/serializeToken'
import mongodb from './mongodb'
import crypto from 'crypto'
import promisify from '../../utils/promisify'

type JwtType = {jwt: string}
type ErrorType = {error: string}
type LoginReturnType = JwtType | ErrorType

const login = async (username: string, password: string): Promise<LoginReturnType> => {
  const client = await mongodb
  if (!client) return { error:'Database not found' }

  const db = client.db()
  const user = await db.collection('user').findOne({username: username})
  if (!user) return { error: 'User not found' }

  const [salt, encrypted] = user.password.split('.')
  
  const derivedKey = await (promisify(crypto.scrypt)(password, salt, 64).catch(() => {}) as Promise<Buffer>)
  if (!derivedKey) return { error: 'Error in scrypting password' }
  
  return derivedKey.toString('hex') !== encrypted
    ? { error: 'Password not match' }
    : { jwt: await serializeToken({username}) }
}
export default login
