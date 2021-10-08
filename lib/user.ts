import verifyToken from './authentication/verifyToken'

const user = (requestCookie: string) => {
  const info = verifyToken(requestCookie)
  return info
}

export default user
