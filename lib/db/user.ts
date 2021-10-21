import { JwtPayload } from 'jsonwebtoken'
import verifyToken from '../authentication/verifyToken'
import mongodb from './mongodb'

type userReturnType = {username: string} | null

const user = async (requestCookie: string): Promise<userReturnType> => {
  const verified = verifyToken(requestCookie) as JwtPayload
  if (verified) {
    const {username} = verified
    const client = await mongodb
    const db = client.db()
    const user = await db.collection('user').findOne({username})
    return user ? {
      username: user.username
    } : null
  }
  return null
}
export default user
