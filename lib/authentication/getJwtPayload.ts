import cookie from 'cookie'
import getUser from '../db/user'

const getJwtPayload = (requestCookies:string | undefined): {data: object} | undefined => {
  if (!requestCookies) return

  const { jwt } = cookie.parse(requestCookies)
  if (!jwt) return

  const user = getUser(jwt)
  if (!user) return
  return { data: user }
}
export default getJwtPayload
