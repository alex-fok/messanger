import cookie from 'cookie'
import User from 'db/user'
import { Payload } from 'types/auth/getJwtPayload'

const getJwtPayload = async (requestCookies:string | undefined): Promise<Payload> => {
  if (!requestCookies) return null

  const { jwt } = cookie.parse(requestCookies)
  if (!jwt) return null
  const username = await User.verify(jwt)
  return username ? {username, jwt} : null
}
export default getJwtPayload
