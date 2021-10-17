import serializeToken from '../authentication/serializeToken'
import mongodb from './mongodb'
import crypto from 'crypto'

const login = async (username: string, password: string):Promise<string | unknown> => {
  const client = await mongodb
  if (!client) return

  const db = client.db()
  return new Promise(async(res, rej) => {
    const user = await db.collection('user').findOne({username: username})

    if (!user) return rej('User not found')
    const [salt, dbPass] = user.password.split('.')
    
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) return rej('Error in scrypting password')

      derivedKey.toString('hex') === dbPass ? res(serializeToken({username})) : rej('Password not match')
    })
  })
}
export default login
