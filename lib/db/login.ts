import serializeToken from '../auth/serializeToken'
import connectToDB from './mongodb'
import crypto from 'crypto'
import promisify from '../../utils/promisify'

const login = async (username: string, password: string):Promise<{jwt:string}> => {
  const client = await connectToDB()
  
  if (!client) {
    throw new Error('Database not found')
  }
  const db = client.db()
  const user = await db.collection('user').findOne({username: username})
  if (!user) throw new Error('User not found')

  const [salt, encrypted] = user.password.split('.')
  
  const derivedKey = 
    await (promisify<Buffer>(crypto.scrypt)(password, salt, 64)
      .catch(_ => {throw Error('Error in scrypting password')}))

  if (derivedKey.toString('hex') !== encrypted) throw new Error('Password not match')
  return { jwt: await serializeToken({username}) }
}
export default login
