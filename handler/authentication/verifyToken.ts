import jwt from 'jsonwebtoken'
import { privateKey } from './jwtConfig'

const parseToken = (token:string) => {
  return jwt.verify(token, privateKey)
}

export default parseToken
