import jwt from "jsonwebtoken"
import cookie from "cookie"
import { timeout, privateKey } from "./jwtConfig"

const setJwtCookie = async ( payload:object ) : Promise<string> => {
  const token = jwt.sign(payload, privateKey, {expiresIn: timeout})
  return cookie.serialize('jwt', token, {maxAge: timeout})
}

export default setJwtCookie
