import jwt from "jsonwebtoken"
import cookie from "cookie"
import { timeout, privateKey } from "./jwtConfig"

const setJwtCookie = async ( payload: {username: string} ) : Promise<string> => {
  const token = jwt.sign({username: payload.username}, privateKey, { algorithm: 'HS256', expiresIn: timeout })
  return cookie.serialize('jwt', token, {maxAge: timeout})
}

export default setJwtCookie
