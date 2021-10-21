import jwt from 'jsonwebtoken'
import { privateKey } from './jwtConfig'

const verifyToken = (token:string) => {
  let verified
  try {
    verified = jwt.verify(token, privateKey, {algorithms: ['HS256']})
  } catch(err) {
    // Invalid token
  } finally {
    return verified
  }
}

export default verifyToken
