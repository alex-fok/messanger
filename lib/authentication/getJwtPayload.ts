import cookie from 'cookie'
import getUser from '../db/user'

const getJwtPayload = async (requestCookies:string | undefined): Promise<{username: string} | undefined> => {
  if (!requestCookies) return

  const { jwt } = cookie.parse(requestCookies)
  if (!jwt) return

  const user = await getUser(jwt)
  if (!user) return
  return user
}
export default getJwtPayload
