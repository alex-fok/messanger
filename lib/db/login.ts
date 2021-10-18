import serializeToken from '../authentication/serializeToken'
import mongodb from './mongodb'
import crypto from 'crypto'
import promisify from '../../utils/promisify'

const login = async (username: string, password: string): Promise<{jwt:string,error:string}> => {
  const client = await mongodb
  if (!client) return { jwt:'', error:'Database not found' }

  const db = client.db()
  const user = await db.collection('user').findOne({username: username})
  if (!user) return { jwt: '', error: 'User not found' }

  const [salt, encrypted] = user.password.split('.')
  
  const derivedKey = await (promisify(crypto.scrypt)(password, salt, 64).catch(() => {}) as Promise<Buffer>)
  if (!derivedKey) return { jwt: '', error: 'Error in scrypting password' }
  
  return derivedKey.toString('hex') !== encrypted
    ? { jwt: '', error: 'Password not match' }
    : { jwt: await serializeToken({username}), error: '' }
}
export default login
