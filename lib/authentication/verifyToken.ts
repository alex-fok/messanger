import jwt from 'jsonwebtoken'
import { privateKey } from './jwtConfig'

const verifyToken = (token:string) => {
  return jwt.verify(token, privateKey, {algorithms: ['HS256']})
}

export default verifyToken
