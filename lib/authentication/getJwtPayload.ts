import cookie from 'cookie'
import User from '../db/user'

type PayloadType = {
  username: string,
  jwt: string
}

const getJwtPayload = async (requestCookies:string | undefined): Promise<PayloadType | null> => {
  if (!requestCookies) return null

  const { jwt } = cookie.parse(requestCookies)
  if (!jwt) return null
  const username = await User.verify(jwt)
  return username ? {username, jwt} : null
}
export default getJwtPayload
