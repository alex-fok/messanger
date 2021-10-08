import { JwtPayload } from 'jsonwebtoken'
import verifyToken from './authentication/verifyToken'
import mongodb from './db/mongodb'

const user = async (requestCookie: string) => {
  const {username} = verifyToken(requestCookie) as JwtPayload
  if (username) {
    const client = await mongodb
    const db = client.db()
    const user = await db.collection('user').findOne({username})
    return user ? {
      username: user.username
    } : {}
  }
  return username
}
export default user
