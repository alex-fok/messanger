import jwt from 'jsonwebtoken'
import { privateKey } from './jwtConfig'
import promisify from '../../utils/promisify'

const verifyToken = async (token:string): Promise<string | jwt.JwtPayload | undefined> => {
  return promisify<string | jwt.JwtPayload | undefined>(jwt.verify)(token, privateKey, {algorithms: ['HS256']})
}

export default verifyToken
